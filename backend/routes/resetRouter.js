var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

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

      let email = null
      if (process.env.NODE_ENV === 'development') {
        email = new Email({
          message: {
            from: process.env.EMAIL_USERNAME
          },
          send: false,
          // transport: transporter,
          juice: true,
          juiceSettings: {
            tableElements: ['TABLE']
          },
          juiceResources: {
            preserveImportant: true,
            webResources: {
              relativeTo: path.join(__dirname, '..', 'assets')
            }
          },
          preview: {
            open: {
              app: 'google chrome',
              wait: false
            }
          }
        })
      } else {
        email = new Email({
          message: {
            from: process.env.EMAIL_USERNAME
          },
          send: true,
          transport: transporter,
          juice: true,
          juiceSettings: {
            tableElements: ['TABLE']
          },
          juiceResources: {
            preserveImportant: true,
            webResources: {
              relativeTo: path.join(__dirname, '..', 'assets')
            }
          },
          preview: false
        })
      }

      email
      .send({
        template: 'forgotten-password',
        message: {
          to: 'danyaalbeg@gmail.com'
        },
        locals: {
          username: user.username,
          url: `https://${process.env.EMAIL_REPLY_API}/resetPassword/${user._id}/${token}`
        }
      })
      .then(() => {
        return res.status(200).send("OK")
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Error Occurred")
      })
    });
  } else {
    res.status(404).send("Cannot find that email");
  }
})

router.route('/resetPassword').post((req, res) => {
  User.findById(req.body.id)
  .then((user) => {
    const secret = process.env.PASSWORD_RESET_SECRET + user.createdAt + user.password
    jwt.verify(req.body.token, secret, (err, decoded) => {
      if(err) {
        console.log(err)
      }
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