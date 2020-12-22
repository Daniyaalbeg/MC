var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');
const { check, validationResult } = require('express-validator');

var email = require('./emailVerificationRouter');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//Get user info
router.route('/me').get(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0})
  .populate({
    path: 'createdOrganisations',
    populate: { path: 'events'}
  })
  .populate({
    path: 'createdOrganisations',
    populate: {
      path: 'projects',
      model: 'Project',
      populate: {
        path: 'supplies.suppliedBy',
        model: 'SupplyAmountReceived'
      }
    }
  })
  .populate({
    path: 'createdOrganisations',
    populate: {
      path: 'projects',
      model: 'Project',
      populate: {
        path: 'sponsorRequests',
        model: 'ProjectSponsorRequest'
      }
    }
  })
  .populate({
    path: 'createdOrganisations',
    populate: {
      path: 'projects',
      populate: {
        path: 'sponsorRequests',
        populate: {
          path: 'requestedOrganisation',
          select: 'name imageURL'
        }
      }
    }
  })
  .populate({
    path: 'createdOrganisations',
    populate: {
      path: 'projects',
      populate: {
        path: 'volunteeringInfo.volunteerRequests',
        populate: {
          path: 'requestingVolunteer',
          select: 'volunteer.firstName volunteer.lastName volunteer.dob volunteer.gender volunteer.about volunteer.contactNumber volunteer.city volunteer.country volunteer.image'
        }
      }
    }
  })
  .populate({
    path: 'createdOrganisations',
    populate: {
      path: 'sponsorRequests',
      populate: {
        path: 'requestingProject',
        select: 'name imageURL'
      }
    }
  })
  .populate('createdGroups')
  .lean()
  .exec((err, user) => {
    if (err) {
      console.log(err)
      res.status(500).send("There was a problem finding the user.")
    };
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
      const isProduction = process.env.NODE_ENV === "production" ? true: false;
      res.cookie('token', token, { maxAge: new Date(Date.now() + 6*60*60*1000), httpOnly: true, secure: isProduction, sameSite: isProduction})
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