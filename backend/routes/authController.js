var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.route('/register').post((req, res) => {
  const password = req.body.password;

  bcrypt.hash(password, 12)
  .then((hashedPassword) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      supplier: null,
      approved: false
    });
  
    newUser.save()
    .then(() => {
      var token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: 86400
      });
      res.status(200).json({
        auth: true,
        token, token
      });
    })
    .catch((error) => res.status(500).json("Error: " + error));
  })
  .catch((error) => res.status(500).json("Error: " + error))
})

router.route('/me').get(verifyToken, (req, res, next) => {
  User.findById(req.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});

router.route('/login').post((req, res) => {
  User.findOne({ username: req.body.username})
  .then((user) => {
    if (!user) {
      return res.status(404).send('No user found');
    }

    bcrypt.compare(req.body.password, user.password)
    .then((passwordIsValid) => {
      if (!passwordIsValid) {
        return res.status(401).json({
          auth: false,
          token: null
        });
      }

      var token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400
      });

      res.status(200).json({
        auth: true,
        token: token
      });
    })
    .catch((error) => res.status(500).json("Error: " + error));
  })
  .catch((error) => res.status(401).json({
    auth: false,
    token: null
  }));
});

router.route('/logout').post((req, res) => {
  res.status(200).json({
    auth: false,
    token: null
  });
});

module.exports = router