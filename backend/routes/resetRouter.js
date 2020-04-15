var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

var User = require('../models/user.model');


router.route('/').get((req, res) => {
  res.status(200).send('<form action="http://localhost:8000/reset/password" method="POST">' +
    '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
    '<input type="submit" value="Reset Password" />' +
    '</form>'
  );
})

router.route('/password').post((req, res) => {
  if (req.body.email !== undefined) {
    var emailAddress = req.body.email;

    User.findOne({email: emailAddress}, {supplier: 0, username: 0, approved: 0})
    .then((user) => {
      if (!user) {
        return res.status(200).send("No user found")
      }

      const secret = process.env.PASSWORD_RESET_SECRET + user.createdAt + user.password;
      const userObjectWithoutPassword = {...user.toObject, password: null}
      var token = jwt.sign(userObjectWithoutPassword, secret)

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      var mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: emailAddress,
        subject: 'Reset Password',
        text: 'Please click this link to reset your password http://localhost:3000/resetPassword/'+user._id+'/'+token
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
    res.status(200).send("OK")
  } else {
    res.status(404).send("Cannot find that email");
  }
})

router.route('/resetPassword').post((req, res) => {
  User.findById(req.body.id)
  .then((user) => {
    const secret = process.env.PASSWORD_RESET_SECRET + user.createdAt + user.password
    jwt.verify(req.body.token, secret, (err, decoded) => {
      if (!err) {
        bcrypt.hash(req.body.password, 12)
        .then((hashedPassword) => {
          user.password = hashedPassword
  
          user.save()
          .then(() => {
            res.status(200).send("Password Updated")
          })
          .catch((error) => {
            console.log("User save issue " + error)
            res.status(500).send("An error occured code 311")
          })
        })
        .catch((error) => {
          console.log("Hashing issue " + error)
          res.status(500).send("An error ocuured code: 312")
        })
      } else {
        console.log("Token failed to authenticate")
        res.status(500).send("Token failed to authenticate code 313")
      }
    })
  })
  .catch((error) => {
    console.log("Cant find user " + error)
    res.status(404).send("User not found");
  })
});

module.exports = router