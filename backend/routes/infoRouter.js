var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../models/user.model');
var Supplier = require('../models/supplier.model').Supplier;
const RationEvent = require('../models/rationEvent.model').RationEvent;

router.route('/').get((req, res) => {
  let numberOfUsers = 0
  let numberOfIndividuals = 0
  let numberOfOrganisations = 0
  let numberOfRations = 0
  let featuredOrgs = []
  User.find(null, (err, result) => {
    if (err) {
      return res.status(500).send("An error occured")
    }
    if (!result) {
      return res.status(500).send("Cannot find number of users")
    }
    result.forEach((user) => {
      numberOfUsers += 1
      if (user.supplier.type === "Individual") {
        numberOfIndividuals += 1
      } else {
        numberOfOrganisations += 1
      }
      numberOfRations += user.supplier.rationEvents.length;
      if (featuredOrgs.length < 4) {
        if (user.supplier !== null) {
          if (user.supplerImageURL !== null) {
            featuredOrgs.push(user.supplier)
          }
        }
      }
    })

    res.status(200).json({
      numberOfRations: numberOfRations,
      numberOfUsers: numberOfUsers,
      numberOfIndividuals: numberOfIndividuals,
      numberOfOrganisations: numberOfOrganisations,
      featuredOrgs: featuredOrgs
    })
  });
});

module.exports = router