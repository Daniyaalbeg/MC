const router = require('express').Router();
const Supplier = require('../models/supplier.model');
const { Organisation } = require('../models/organisation.model');
const User = require('../models/user.model');
const Event = require('../models/event.model').Event;
const verifyToken = require('../verifyToken');
const s3 = require('./s3Controller');
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Create a new event
router.route('/create/:orgID').post(verifyToken, (req, res, next) => {
  Organisation.findById(req.params.orgID, (err, org) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ errorDesc: "There was a problem finding the org."})
    }
    if (!org) return res.status(404).json({ errorDesc: "No user found." });

    if (org.createdBy.toString() !== req.id) {
      return res.status(500).json({ errorDesc: "This org was not created by this user" })
    }

    const createdBy = org._id;
    const name = req.body.name;
    const description = req.body.description;
    const totalNumberOfItems = req.body.totalNumberOfItems;
    const itemsDescription = req.body.itemsDescription;
    const typeOfRation = req.body.typeOfRation;
    const images = req.body.images;
    const location = req.body.location;
    const date = req.body.date;
    const approved = false;

    const newEvent = new Event({
      createdBy,
      name,
      description,
      totalNumberOfItems,
      itemsDescription,
      typeOfRation,
      images,
      location,
      date,
      approved
    });

    newEvent.save((err, event) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ errorDesc: "Cound not save event" });
      }
      
      org.events.push(event._id)

      org.save((err, org) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ errorDesc: "There was a problem saving the user." });
        }
        res.status(200).json('new event created')
      })
    })

  })

});

//Get all  events
router.route('/').get((req, res) => {
  const searchOptions = {
    approved: true
  }

  if (req.query.filterCategory !== "all" && req.query.search !== "") {
    searchOptions.typeOfRation = req.query.filterCategory
    searchOptions.$text = {
      $search: req.query.search
    }
  } else if (req.query.filterCategory !== "all") {
    searchOptions.typeOfRation = req.query.filterCategory
  } else if (req.query.search !== "") {
    searchOptions.$text = {
      $search: req.query.search
    }
  }

  Event.find(searchOptions)
  .populate('createdBy')
  .lean()
  .exec((err, events) => {
    if (err) { return res.status(500).json({ errorDesc: "Error getting events" })}
    res.status(200).json(events);
  })
  
});

//Get specific event by id
// router.route('/:id').get((req, res) => {
//   Event.findById(req.params.id)
//   .populate('createdBy', 'supplier')
//   .exec((err, event) => {
//     res.status(200).json(event)
//   })
// })

//Delete a specific  event
router.route('/:id').delete(verifyToken, (req, res, next) => {
  const eventID = req.params.id
  Event.findById(eventID, (err, event) => {
    if (err) return res.status(500).json({ errorDesc: "There was a problem finding the event" });
    if (!event) return res.status(500).json({ errorDesc: "There was a problem finding your event." })

    Organisation.findById(event.createdBy, (err, org) => {
      if (err) return res.status(500).json({ errorDesc: "There was a problem finding the org" });
      if (!org) return res.status(500).json({ errorDesc: "There was a problem finding your org." })
      
      if (org.createdBy.toString() !== req.id) return res.status(500).json({ errorDesc: "You cannot delete this as you are not the creator"})

      event.deleted = true

      event.save()
      .then((event) => {
        let foundEvent = null
        for (let i = 0; i < org.events.length; i++) {
          if (org.events[i].toString() === eventID) {
            foundEvent = org.events.splice(i, 1);
            break
          }
        }
        if (!foundEvent) {
          return res.status(500).json({ errorDesc: "Event not found"})
        }

        org.save((err, org) => {
          if (err) return res.status(500).json({ errorDesc: "There was a problem saving the org" });
          if (!org) return res.status(500).json({ errorDesc: "There was a problem finding your org." })

          return res.status(200).send('successfully deleted')
        })
      })
      .catch((error) => { 
        console.log(error)
        return res.status(500).json({ errorDesc: "Could not save event" }) })
    })
  })
})


//Update a  event
router.route('/update/:id').post(verifyToken, (req, res, next) => {
  Organisation.findById(req.body.createdBy, (err, org) => {
    if (err) return res.status(500).json({ errorDesc: "There was a problem finding the org."});
    if (!org) return res.status(404).json({ errorDesc: "No org found." });
    
    if (org.createdBy.toString() !== req.id) {
      return res.status(500).json({ errorDesc: "You are not auuthorised to edit this event"});
    }

    Event.findById(req.params.id, { password: 0}, function (err, event) {
      if (err) return res.status(500).json({ errorDesc: "There was a problem finding the event."});
      if (!event) return res.status(404).json({ errorDesc: "No user found." });
  
      event.name = req.body.name;
      event.description = req.body.description;
      event.totalNumberOfItems = req.body.totalNumberOfItems;
      event.itemsDescription = req.body.itemsDescription;
      event.typeOfRation = req.body.typeOfRation;
      event.images = req.body.images;
      event.location = req.body.location;
      event.date = req.body.date;
  
      event.save((err, event) => {
        if (err) return res.status(500).json({ errorDesc: "There was a problem saving the event."});
        if (!event) return res.status(404).json({ errorDesc: "No event saved." });
        
        res.status(200).send("Event succesfully saved")
      })
    })

  })
})

module.exports = router