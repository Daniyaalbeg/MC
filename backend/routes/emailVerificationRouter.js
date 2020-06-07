var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');

var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

router.route('/verify').post((req, res) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, process.env.VERIFY_EMAIL_SECRET, (err, decoded) => {
    if (!err) {
      console.log(decoded.id)
      User.findById(decoded.id)
      .then((user) => {
        if (!user) {
          console.log("User not found")
          return res.status(500).json({ error: "cannot find user" })
        }
        console.log("User found")
        user.verified = true;
        user.save()
        .then(() => {
          console.log("user saved")
          return res.status(200).json("Succesfully Verified")
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json("An error occured")
        });
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json("User not found");
      });
    } else {
      return res.status(500).send("Not verified");
    }
  })

})

//Verify email
router.route('/').post(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    sendVerificationEmail(user, () => {
      res.status(200).send("successfully verified email")
    }, () => {
      res.status(500).send("An error occurred")
    })

    // res.status(200);
  })
  .catch((error) => {
    console.log("Cant find user " + error)
    res.status(404).send("User not found");
  })
});

const sendVerificationEmail = (user, callback, errorCallback) => {
  const secret = process.env.VERIFY_EMAIL_SECRET;
  const userObject = user._id
  var token = jwt.sign({ id: userObject}, secret)

  var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: true
    }
  });

  var mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: 'Verify Email',
    html: `
    <h3> Thank you for signing up </h3>
    <p> Hi `+user.username+`. Please click this <a href="https://`+process.env.EMAIL_REPLY_API+`/verify/`+token+`"> link </a> to verify your account</p>
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      // errorCallback()
    } else {
      // callback()
      console.log('Email sent: ' + info.response);
    }
  });

};


module.exports = {
  router: router,
  sendVerificationEmail: sendVerificationEmail
};
// module.exports = router;