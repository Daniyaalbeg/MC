var express = require('express');
var router = express.Router();

var User = require('../models/user.model');
const Event = require('../models/event.model').Event;
const Group = require('../models/group.model').Group;

router.route('/featured').get((req, res) => {
  User.aggregate([{ $match: { supplier: {$ne: null}, approved: true } }, { $sample: { size: 4 } }])
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
  let numberOfGroups = 0
  let numberOfOrganisations = 0
  let numberOfEvents = 0

let promises = [
  User.find(null)
  .then((result) => {
    if (!result) {
      console.log("Error finding user numbers")
      return res.status(500).send("Cannot find number of users")
    }
    result.forEach((user) => {
      numberOfUsers += 1
      if (!user.supplier || !user.approved) {
        return
      }
      numberOfOrganisations += 1
    })
    return res.status(200)
  }),
  Event.countDocuments({})
  .then((count) => { numberOfEvents = count })
  .catch((err) => { return res.status(500).json({ errorDesc: "Cannot fetch events" }) }),
  Group.countDocuments({ approved: true })
  .then((count) => { numberOfGroups = count })
  .catch((err) => { return res.status(500).json({ errorDesc: "Cannot fetch events" }) }),
]

Promise.all(promises)
.then(() => {
  res.status(200).json({
    numberOfEvents: numberOfEvents,
    numberOfUsers: numberOfUsers,
    numberOfGroups: numberOfGroups,
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