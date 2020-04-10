var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

var User = require('../models/user.model');
var Supplier = require('../models/supplier.model').Supplier;
var BankingDetails = require('../models/bankingDetails.model').BankingDetails;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.route('/createUser').post((req, res) => {
  const password = req.body.password;

  bcrypt.hash(password, 12)
  .then((hashedPassword) => {
    console.log(req.body);
    const bankingDetails = new BankingDetails({
      bankName: req.body.bankingDetails.bankName,
      bankBranch: req.body.bankingDetails.bankBranch,
      accountTitle: req.body.bankingDetails.accountTitle,
      accountNumber: req.body.bankingDetails.accountNumber,
      IBAN: req.body.bankingDetails.IBAN,
      swiftCode: req.body.bankingDetails.swiftCode,
      jazzCash: req.body.bankingDetails.jazzCash,
      easyPaisa: req.body.bankingDetails.easyPaisa
    });
    const supplier = new Supplier({
      supplierName: req.body.supplierName,
      bankingDetails: bankingDetails,
      type: req.body.type,
      areaOfWork: req.body.areaOfWork,
      description: req.body.description,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      contactInfo: req.body.contactInfo,
      supplierWebsite: req.body.supplierWebsite,
      facebookURL: req.body.facebookURL,
      twitterURL: req.body.twitterURL,
      instagramURL: req.body.instagramURL
    });
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      supplier: supplier,
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
    .catch((error) => {
      console.log(error);
      res.status(500).json("Error: " + error)
    });
  });
});

//register
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
  User.findById(req.id, { password: 0}, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});

router.route('/login').post((req, res) => {
  User.findOne({ email: req.body.email })
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