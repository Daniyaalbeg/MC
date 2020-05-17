var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../models/user.model');
var Supplier = require('../models/supplier.model').Supplier;
const Event = require('../models/event.model').Event;

router.route('/featured').get((req, res) => {
  User.aggregate([{ $match: { approved: true} }, { $sample: { size: 4 } }])
  .then((users) => {
    const featuredSuppliers = []
    users.forEach((user) => {
      featuredSuppliers.push(user.supplier)
    })
    res.status(200).json(featuredSuppliers)
  })
  .catch((error) => {
    res.status(500).send("An error occurred")
  })
})

router.route('/').get((req, res) => {
  let numberOfUsers = 0
  let numberOfIndividuals = 0
  let numberOfOrganisations = 0
  let numberOfEvents = 0

let promises = [
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
    })
  }),
  Event.countDocuments({})
    .then((count) => { numberOfEvents = count }),
]

Promise.all(promises)
.then(() => {
  res.status(200).json({
    numberOfEvents: numberOfEvents,
    numberOfUsers: numberOfUsers,
    numberOfIndividuals: numberOfIndividuals,
    numberOfOrganisations: numberOfOrganisations
  });
})
.catch((error) => {
  console.log(error)
  res.status(500).send("An error occured")
})

  // let promises = [
  //   User.countDocuments({})
  //   .then((count) => { numberOfUsers = count }),
  //   User.countDocuments({ type: 'Individual' })
  //   .then((count) => { numberOfIndividuals = count }),
  //   Supplier.countDocuments({})
  //   .then((count) => {
  //     numberOfOrganisations = Math.abs(count - numberOfIndividuals)
  //   }),
  //   Event.countDocuments({})
  //   .then((count) => { numberOfEvents = count }),
  // ]

  // Promise.all(promises)
  // .then(() => {
  //   res.status(200).json({
  //     numberOfEvents: numberOfEvents,
  //     numberOfUsers: numberOfUsers,
  //     numberOfIndividuals: numberOfIndividuals,
  //     numberOfOrganisations: numberOfOrganisations
  //   });
  // })
  // .catch((error) => {
  //   console.log(error)
  //   res.status(500).send("An error occured")
  // })

});

module.exports = router