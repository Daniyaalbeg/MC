const router = require('express').Router();
const { verify } = require('jsonwebtoken');
const User = require('../models/user.model');
const verifyToken = require('../verifyToken');
const Organisation = require('../models/organisation.model').Organisation;
const Volunteer = require('../models/volunteer/volunteer.model').Volunteer;
const verfiyToken = require('../verifyToken');
const mongoose = require('mongoose');
const db = mongoose.connection

//Create a volunteer when user exists
router.route('/create').post(verifyToken, (req, res, next) => {
  User.findById(req.id, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(500).send("There was a problem finding the user.");
    }
    if (!user) return res.status(404).send("No user found.");

    const volunteer = new Volunteer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      cnic: req.body.cnic,
      image: req.body.image,
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


    user.volunteer = volunteer
    user.save((err, user) => {
      if (err) {
        console.log(err)
        return res.status(500).send("There was a problem saving the user.");
      }
      if (!user) return res.status(404).send("No user found.");

      return res.status(200).send('success')
    })
  })
})

//Create a volunteer when user does not exist

module.exports = router