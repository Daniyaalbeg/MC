var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');
const { check, validationResult } = require('express-validator');

var email = require('./emailVerificationRouter');

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

var User = require('../models/user.model');
var Supplier = require('../models/supplier.model').Supplier;
var BankingDetails = require('../models/bankingDetails.model').BankingDetails;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.route('/createUser').post([
  check('email').isEmail().normalizeEmail(),
  check('username').trim().escape(),
  check('password').trim(),
  check('supplierName'),
  check('supplierImageURL').isURL(),
  check('type'),
  check('areaOfWork'),
  check('description'),
  check('address'),
  check('contactName'),
  check('contactNumber'),
  check('contactInfo'),
  check('supplierWebsite').isURL(),
  check('facebookURL').isURL(),
  check('twitterURL').isURL(),
  check('instagramURL').isURL(),
  check('bankName'),
  check('bankBranch'),
  check('accountTitle'),
  check('accountNumber'),
  check('IBAN'),
  check('swiftCode'),
  check('jazzCash'),
  check('easyPaisa')

],(req, res) => {


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
      supplierImageURL: req.body.supplierImageURL,
      bankingDetails: bankingDetails,
      type: req.body.type,
      areaOfWork: req.body.areaOfWork,
      description: req.body.description,
      address: req.body.address,
      contactName: req.body.contactName,
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
      approved: false,
      verified: false
    });

    newUser.save()
    .then(() => {
      var token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: 86400
      });
      res.cookie('token', token, { maxAge: new Date(Date.now() + 6*60*60*1000), httpOnly: true, secure: false, sameSite: false})
      res.status(200).json({
        auth: true,
        token, token
      });
      email.sendVerificationEmail(newUser);
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 11000) {
        res.status(500).json({ errorCode: 200})
      } else {
        res.status(500).json({ errorCode: 100})
      }
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
      approved: false,
      verified: false
    });
  
    newUser.save()
    .then(() => {
      var token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: 86400
      });
      res.status(200).json({
        // auth: true,
        // token, token
      });
    })
    .catch((error) => res.status(500).send("An error occured"));
  })
  .catch((error) => res.status(500).send("An error occured"))
})

router.route('/me').get(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0})
  .populate('user.supplier')
  .exec((err, user) => {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});

router.route('/checkCookie').post(verifyToken, (req, res, next) => {
  res.status(200).json({
    auth: true
  })
})

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
      res.cookie('token', token, { maxAge: new Date(Date.now() + 6*60*60*1000), httpOnly: true, secure: false, sameSite: true})
      res.status(200).json({
        auth: true,
        // token: token
      });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json(error)
    });
  })
  .catch((error) => {
    console.log("error auth false token null")
    res.status(401).json({
    auth: false,
    token: null
  })});
});

router.route('/logout').post(verifyToken, (req, res, next) => {
  res.cookie('token', null, { maxAge: -10000000, httpOnly: true, secure: false })
  res.status(200).json({
    auth: false
  });
})

module.exports = router