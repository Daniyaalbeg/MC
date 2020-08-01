var express = require('express');
var router = express.Router();

var User = require('../models/user.model');
const { Organisation } = require('../models/organisation.model');
const Event = require('../models/event.model').Event;
const Group = require('../models/group.model').Group;

router.route('/featured').get((req, res) => {
  Organisation.aggregate([{ $match: { approved: true }}, { $sample: { size: 4} }])
  .then((orgs) => {
    return res.status(200).json(orgs)
  })
  .catch((error) => {
    console.log(error)
    return res.status(500).send("An error occurred")
  })
})

router.route('/').get((req, res) => {
  let numberOfUsers = 0
  let numberOfGroups = 0
  let numberOfOrganisations = 0
  let numberOfEvents = 0

let promises = [
  Organisation.countDocuments({})
  .then((count) => { numberOfOrganisations = count })
  .catch((err) => { return res.status(500).json({ errorDesc: "Cannot fetch organisations" }) }),
  User.countDocuments({})
  .then((count) => { numberOfUsers = count })
  .catch((err) => { return res.status(500).json({ errorDesc: "Cannot fetch users" }) }),
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