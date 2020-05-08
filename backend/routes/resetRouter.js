var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

var User = require('../models/user.model');

function ValidateEmail(email) {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}

router.route('/password').post((req, res) => {
  if (req.body.email !== undefined && ValidateEmail(req.body.email)) {
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
        host: 'smtp.stackmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      var mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: emailAddress,
        subject: 'Reset Password',
        text: 'Please click this link to reset your password https://ministryofchange.org/resetPassword/'+user._id+'/'+token
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