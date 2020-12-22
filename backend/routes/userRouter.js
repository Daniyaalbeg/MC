const router = require('express').Router();
const User = require('../models/user.model');
const Address = require('../models/address.model').Address;
const Volunteer = require('../models/volunteer/volunteer.model').Volunteer

var sendVerificationEmail = require('./emailVerificationRouter').sendVerificationEmail;
const verifyToken = require('../verifyToken');

const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//Create a new user
router.route('/create').post([
  check('email').isEmail().normalizeEmail(),
  check('username').trim().escape(),
  check('password').trim().matches(/(?=^.{5,20}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=(.*\d){1,}))((?!.*[",;&|'])|(?=(.*\W){1,}))(?!.*[",;&|'])^.*$/),
  check('mobile').trim(),
  check('cnic').trim().matches(/^(\d{13})?$|[0-9]{12}-[0-9]{1}$|[0-9]{5}-[0-9]{7}-[0-9]{1}$|[0-9]{6}-[0-9]{6}-[0-9]{1}$/),
  check('address.line1'),
  check('address.city').trim(),
  check('address.region'),
  check('address.postCode').trim(),
  check('address.country'),

],(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(422).json({ errorCode: 300, errors: errors.array() });
  }

  const email = req.body.email
  const password = req.body.password;
  bcrypt.hash(password, 12)
  .then((hashedPassword) => {

    const address = new Address({
      line1: req.body.address.line1 ? req.body.address.line1.toLowerCase() : "",
      city: req.body.address.city ? req.body.address.city.toLowerCase() : "",
      region: req.body.address.region ? req.body.address.region.toLowerCase() : "",
      postCode: req.body.address.postCode ? req.body.address.postCode.toLowerCase() : "",
      country: req.body.address.country ? req.body.address.country.toLowerCase() : "",
    })

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: email,
      username: req.body.username,
      password: hashedPassword,
      mobile: req.body.mobile,
      cnic: req.body.cnic,
      address: address,
      createdOrganisations: [],
      createdGroups: [],
      volunteer: null,
      approved: false,
      verified: false
    });

    newUser.save()
    .then(() => {
      sendVerificationEmail(newUser,
        () => {console.log("sending email")},
        () => {console.log("failed sending email")}
      );
      
      var token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: 86400
      });
      const isProduction = process.env.NODE_ENV === "production" ? true: false;
      res.cookie('token', token, { maxAge: new Date(Date.now() + 6*60*60*1000), httpOnly: true, secure: isProduction, sameSite: isProduction})
      res.status(200).json({
        auth: true,
        // token, token
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 11000) {
        return res.status(500).json({ errorCode: 200})
      } else {
        return res.status(500).json({ errorCode: 100})
      }
    });
  })
});

//Create a user volunteer
router.route('/create/volunteer').post([
  check('email').isEmail().normalizeEmail(),
  check('username').trim().escape(),
  check('password').trim().matches(/(?=^.{5,20}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=(.*\d){1,}))((?!.*[",;&|'])|(?=(.*\W){1,}))(?!.*[",;&|'])^.*$/),
  check('mobile').trim(),
  check('cnic').trim().matches(/^(\d{13})?$|[0-9]{12}-[0-9]{1}$|[0-9]{5}-[0-9]{7}-[0-9]{1}$|[0-9]{6}-[0-9]{6}-[0-9]{1}$/),
  check('address.line1'),
  check('address.city').trim(),
  check('address.region'),
  check('address.postCode').trim(),
  check('address.country'),

],(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(422).json({ errorCode: 300, errors: errors.array() });
  }

  const email = req.body.email
  const password = req.body.password;
  bcrypt.hash(password, 12)
  .then((hashedPassword) => {

    const address = new Address({
      city: req.body.city ? req.body.city.toLowerCase() : "",
      country: req.body.country ? req.body.country.toLowerCase() : "",
    })

    const volunteer = new Volunteer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      cnic: req.body.cnic,
      imageURL: req.body.imageURL,
      dob: req.body.dob,
      gender: req.body.gender,
      about: req.body.about,
      contactNumber: req.body.contactNumber,
      educationLevel: req.body.educationLevel,
      employmentStatus: req.body.employmentStatus,
      disability: req.body.disability,
      haveSmartPhone: req.body.haveSmartPhone,
      vehicle: req.body.vehicle,
      preferredContact: req.body.preferredContact,
      city: req.body.city,
      country: req.body.country,
      languages: req.body.languages,
      skills: req.body.skills,
      interests: req.body.interests,
      volunteering: [],
      isPrivate: req.body.isPrivate,
    })

    const newUser = new User({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: email,
      username: req.body.username,
      password: hashedPassword,
      mobile: req.body.mobile,
      cnic: req.body.cnic,
      address: address,
      createdOrganisations: [],
      createdGroups: [],
      volunteer: volunteer,
      approved: false,
      verified: false
    });

    newUser.save()
    .then(() => {
      sendVerificationEmail(newUser,
        () => {console.log("sending email")},
        () => {console.log("failed sending email")}
      );
      
      var token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: 86400
      });
      const isProduction = process.env.NODE_ENV === "production" ? true: false;
      res.cookie('token', token, { maxAge: new Date(Date.now() + 6*60*60*1000), httpOnly: true, secure: isProduction, sameSite: isProduction})
      res.status(200).json({
        auth: true,
        // token, token
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        //Duplicate email
        return res.status(409).json({ errorCode: 200})
      } else {
        //Otehr errors
        console.log(error)
        return res.status(500).json({ errorCode: 100})
      }
    });
  })
});

//Get all users DELETE OR SOMETHING!
// router.route('/').get((req, res) => {
//   User.find(null, { password: 0})
//   .then((users) => res.status(200).json(users))
//   .catch((error) => res.status(500).json('Error: ' + error));
// })

//Get a specific user
// router.route('/:id').get((req, res) => {
//   User.findById(req.params.id, { password: 0})
//   .then((user) => { res.status(200).json(user) })
//   .catch((error) => res.status(500).json("Errpr: " + error));
// });

//Update a user
router.route('/edit').post(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0 })
  .then((user) => {
    user.mobile = req.body.mobile
    user.username = req.body.username
    user.cnic = req.body.cnic

    user.address.line1 = req.body.line1
    user.address.city = req.body.city
    user.address.region = req.body.region
    user.address.postCode = req.body.postCode
    user.address.country = req.body.country

    console.log('here')

    user.save()
    .then((user) => {
      return res.status(200).json({ success: "success" })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ errorDesc: "Counld not save new user"})
    })

  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({ errorDesc: "Could not find user" })
  });
});

//Delete a user
// router.route('/:id').delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//   .then(() => res.status(200).json("User was deleted"))
//   .catch((error) => res.status(500).json("Error: " + error))
// })


module.exports = router;