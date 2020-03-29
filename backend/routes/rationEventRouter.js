const router = require('express').Router();
const RationEvent = require('../models/rationEvent.model');

//Get all ration events
router.route('/').get((req, res) => {
  RationEvent.find()
  .then((rationEvents) => res.json(rationEvents))
  .catch((error) => res.status(500).json("Error: ") + error)
});

//Get specific event by id
router.route('/:id').get((req, res) => {
  RationEvent.findById(req.params.id)
  .then((rationEvent) => req.status(200).json(rationEvent))
  .catch((error) => req.status(500).json("Error: " + error))
})

//Delete a specific ration event
router.route('/:id').delete((req, res) => {
  RationEvent.findByIdAndDelete(req.params.id)
  .then(() => req.status(200).json("Ration event deleted"))
  .catch((error) => req.status(500).json("Error: " + error))
})


//Update a ration event
router.route('/update/:id').post((req, res) => {
  RationEvent.findById(req.params.id)
  .then((rationEvent) => {
    rationEvent.name = req.body.name;
    rationEvent.description = req.body.description;
    rationEvent.supplier = req.body.supplier;
    rationEvent.location = req.body.location;
    rationEvent.date = req.body.date;
    rationEvent.approved = req.body.approved;

    rationEvent.save()
    .then(() => res.status(200).json("rationEvent updated succesfully"))
    .catch((error) => res.status(500).json("Error: " + error))
  })
})

//Post a new ration event
router.route('/create').post((req, res) => {
  const name = req.body.name  ;
  const description = req.body.description;
  const supplier = req.body.supplier;
  const location = req.body.location;
  const date = req.body.date;
  const approved = req.body.approved;

  const newRationEvent = new RationEvent({
    name,
    description,
    supplier,
    location,
    date,
    approved
  });

  newRationEvent.save()
  .then(() => res.json('New ration event created'))
  .catch((error) => res.status(500).json('Error: ' + error))
})

module.exports = router