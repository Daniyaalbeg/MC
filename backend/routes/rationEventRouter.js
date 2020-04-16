const router = require('express').Router();
const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const RationEvent = require('../models/rationEvent.model').RationEvent;
const verifyToken = require('../verifyToken');

//Create a new ration event
router.route('/create').post(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    const name = req.body.name;
    const description = req.body.description;
    const totalNumberOfItems = req.body.totalNumberOfItems;
    const itemsDescription = req.body.itemsDescription;
    const location = req.body.location;
    const date = req.body.date;
    const approved = false;

    const newRationEvent = new RationEvent({
      name,
      description,
      totalNumberOfItems,
      itemsDescription,
      location,
      date,
      approved
    });

    user.supplier.rationEvents.push(newRationEvent);

    user.save()
    .then(() => res.json('New ration event created'))
    .catch((error) => res.status(500).json('Error: ' + error));
  });
});

//Get all ration events
router.route('/').get((req, res) => {
  const rationEventsCollected = [];
  User.find(null, { username: 0, email: 0, password: 0})
  .then((users) => {
    users.forEach((user) => {
      var rationEvents = user.supplier.rationEvents;
      rationEvents.forEach((rationEvent) => {
        var newRationEvent = {...rationEvent.toObject()} //Convert mongoose model to JS object
         newRationEvent.supplier = user.supplier;
        newRationEvent.supplier.rationEvents = null;
        rationEventsCollected.push(newRationEvent);
      });
    });
    res.status(200).json(rationEventsCollected);
  })
  .catch((error) => res.status(500).json("Error: " + error));
});

//Get specific event by id
router.route('/:id').get((req, res) => {
  User.find(null, { password: 0})
  .then((users) => {
    users.forEach((user) => {
      const rationEvents = user.supplier.rationEvents;
      rationEvents.forEach((rationEvent) => {
        if (rationEvent._id == req.params.id) {
          return res.status(200).json(rationEvent);
        }
      });
    });
    // return res.status(404).json("Requested resource not found");
  })
  .catch((error) => res.status(500).json("Error: " + error));
})

//Delete a specific ration event
router.route('/:id').delete(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) res.status(500).json("There was a problem finding the ration event/");
    if (!user) res.status(500).json("There was a problem finding your user.")

    const rationEvents = user.supplier.rationEvents;
    rationEvents.forEach((rationEvent, index, object) => {
      if (rationEvent._id == req.params.id) {
        object.splice(index, 1);
      }
    });
    user.save()
    .then(() => res.status(200).json("Delete succesful"))
  })
  .catch((error) => res.status(500).json("Error:" + error));
})


//Update a ration event
router.route('/update/:id').post(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    const supplier = user.supplier;
    const rationEvents = supplier.rationEvents;
    rationEvents.forEach(rationEvent => {
      if (rationEvent._id == req.params.id) {
        return res.status(200).json(rationEvent);
      }
    });
    return res.status(500).json("No ration event found");
  });
  RationEvent.findById(req.params.id)
  .then((rationEvent) => {
    rationEvent.name = req.body.name;
    rationEvent.description = req.body.description;
    rationEvent.totalNumberOfItems = req.body.totalNumberOfItems;
    rationEvent.itemsDescription = req.body.itemsDescription
    rationEvent.supplier = req.body.supplier;
    rationEvent.location = req.body.location;
    rationEvent.date = req.body.date;
    rationEvent.approved = req.body.approved;

    rationEvent.save()
    .then(() => res.status(200).json("rationEvent updated succesfully"))
    .catch((error) => res.status(500).json("Error: " + error))
  })
})

module.exports = router