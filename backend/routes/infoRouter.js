var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../models/user.model');
var Supplier = require('../models/supplier.model').Supplier;
const RationEvent = require('../models/rationEvent.model').RationEvent;

router.route('/').get((req, res) => {
  let numberOfUsers = 0
  let numberOfRations = 0
  let featuredEvents = []
  User.find(null, (err, result) => {
    if (err) {
      return res.status(500).send("An error occured")
    }
    if (!result) {
      return res.status(500).send("Cannot find number of users")
    }
    result.forEach((user) => {
      numberOfUsers += 1
      numberOfRations += user.supplier.rationEvents.length;
      while (featuredEvents.length < 4) {
        if (user.supplier.rationEvents !== undefined) {
          for (let i = 0; i < user.supplier.rationEvents.length; i++) {
            if (featuredEvents.length < 4) {
              featuredEvents.push(user.supplier.rationEvents[i])
            } else {
              break
            }
          }
        }
      }
    })

    res.status(200).json({
      numberOfRations: numberOfRations,
      numberOfUsers: numberOfUsers,
      featuredEvents: featuredEvents
    })
  });
});

module.exports = router