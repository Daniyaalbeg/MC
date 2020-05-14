const router = require('express').Router();
const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const Event = require('../models/event.model').Event;
const verifyToken = require('../verifyToken');

//Create a new event
router.route('/create').post(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    const createdBy = user._id;
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
      if (err) return res.status(500).send("Cound not save event");
      user.supplier.events.push(event._id);

      user.save((err, user) => {
        console.log(err)
        if (err) return res.status(500).send("There was a problem saving the user.");
        res.json('new event created')
      })
    })
  });




  // User.findById(req.id, { password: 0}, (err, user) => {
  //   if (err) res.status(500).send("There was a problem finding the user.");
  //   if (!user) return res.status(404).send("No user found.");

  //   const name = req.body.name;
  //   const description = req.body.description;
  //   const totalNumberOfItems = req.body.totalNumberOfItems;
  //   const itemsDescription = req.body.itemsDescription;
  //   const typeOfRation = req.body.typeOfRation;
  //   const images = req.body.images;
  //   const location = req.body.location;
  //   const date = req.body.date;
  //   const approved = false;

  //   const newEvent = new Event({
  //     name,
  //     description,
  //     totalNumberOfItems,
  //     itemsDescription,
  //     typeOfRation,
  //     images,
  //     location,
  //     date,
  //     approved
  //   });

  //   user.supplier.events.push(newEvent);

  //   user.save()
  //   .then(() => {
  //     res.json('New event created')
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     res.status(500).json("An error occured")
  //   });
  // });

});

//Get all  events
router.route('/').get((req, res) => {
  Event.find({ approved: true }, (err, events) => {
    if (err) { return res.status(500).send("Error getting events")}
    res.status(200).json(events);
  })

  // const eventsCollected = [];
  // User.find(null, { username: 0, email: 0, password: 0})
  // .then((users) => {
  //   users.forEach((user) => {
  //     var events = user.supplier.events;
  //     events.forEach((event) => {
  //       var newEvent = {...event.toObject()} //Convert mongoose model to JS object
  //       newEvent.supplier = user.supplier;
  //       newEvent.supplier.events = null;
  //       eventsCollected.push(newEvent);
  //     });
  //   });
  //   res.status(200).json(eventsCollected);
  // })
  // .catch((error) => {
  //   console.log(error)
  //   res.status(500).json("An error occured")
  // });
});

//Get specific event by id
router.route('/:id').get((req, res) => {
  Event.findById(req.params.id)
  .populate('createdBy', 'supplier')
  .exec((err, event) => {
    res.status(200).json(event)
  })

  // User.find(null, { password: 0})
  // .then((users) => {
  //   users.forEach((user) => {
  //     const events = user.supplier.events;
  //     events.forEach((event) => {
  //       if (event._id === req.params.id) {
  //         return res.status(200).send(event);
  //       }
  //     });
  //   });
  //   // return res.status(404).json("Requested resource not found");
  // })
  // .catch((error) => {
  //   console.log(error)
  //   res.status(500).send("An error occured")
  // });
})

//Delete a specific  event
router.route('/:id').delete(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) res.status(500).json("There was a problem finding the event/");
    if (!user) res.status(500).json("There was a problem finding your user.")

    const events = user.supplier.events

    let eventFound = false
    for ( let i = 0; i < events.length; i++) {
      if (events[i].equals(req.params.id)) {
        eventFound = true
        events.splice(i, 1);
        break
      }
    }
    if (!eventFound) {
      return res.status(500).send("Event not found")
    }

    user.save()
    .then(() => {
      Event.deleteOne({ _id: req.params.id}, (err) => {
        if (err) {
          res.status(200).json("delete successfull")
          console.log("error deleting event + " + req.params.id)
          res.status(200).json("Delete succesful")
        }
        res.status(200).json("Delete succesful") 
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send("User could not be saved")
    })


  })
  
  
  // User.findById(req.id, { password: 0}, (err, user) => {
  //   if (err) res.status(500).json("There was a problem finding the event/");
  //   if (!user) res.status(500).json("There was a problem finding your user.")

  //   const events = user.supplier.events;

  //   let eventFound = false
  //   for ( let i = 0; i < events.length; i++) {
  //     if (events[i]._id.equals(req.params.id)) {
  //       eventFound = true
  //       events.splice(i, 1);
  //       break
  //     }
  //   }
  //   if (!eventFound) {
  //     return res.status(500).send("Event not found")
  //   }
  //   user.save()
  //   .then(() => {
  //     res.status(200).json("Delete succesful")
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     res.status(500).send("User could not be saved")
  //   })
  // })
  // .catch((error) => {
  //   console.log(error)
  //   res.status(500).json("An error occured")
  // });
})


//Update a  event
router.route('/update/:id').post(verifyToken, (req, res, next) => {
  Event.findById(req.params.id, { password: 0}, function (err, event) {
    if (err) return res.status(500).send("There was a problem finding the event.");
    if (!event) return res.status(404).send("No user found.");

    event.name = req.body.name;
    event.description = req.body.description;
    event.totalNumberOfItems = req.body.totalNumberOfItems;
    event.itemsDescription = req.body.itemsDescription;
    event.typeOfRation = req.body.typeOfRation;
    event.images = req.body.images;
    event.location = req.body.location;
    event.date = req.body.date;

    event.save((err, event) => {
      if (err) return res.status(500).send("There was a problem saving the event");
      res.status(200).send("Event succesfully saved")
    })
  })

  // User.findById(req.id, { password: 0}, function (err, user) {
  //   if (err) return res.status(500).send("There was a problem finding the user.");
  //   if (!user) return res.status(404).send("No user found.");
  

  //   const supplier = user.supplier;
  //   const events = supplier.events;
  //   for( let i =0; i< events.length; i++) {
  //     if (events[i]._id.equals(req.params.id)) {
  //       events[i].name = req.body.name;
  //       events[i].description = req.body.description;
  //       events[i].totalNumberOfItems = req.body.totalNumberOfItems;
  //       events[i].itemsDescription = req.body.itemsDescription;
  //       events[i].typeOfRation = req.body.typeOfRation;
  //       events[i].images = req.body.images;
  //       events[i].location = req.body.location;
  //       events[i].date = req.body.date;

  //       user.save()
  //       .then(() => {
  //         return res.status(200).json("Event updated succesfully")
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //         res.status(500).json("An error occured")
  //       }) 
  //     }
  //   }
  // });
  
  // RationEvent.findById(req.params.id)
  // .then((rationEvent) => {
  //   // rationEvent.name = req.body.name;
  //   // rationEvent.description = req.body.description;
  //   // rationEvent.totalNumberOfItems = req.body.totalNumberOfItems;
  //   // rationEvent.itemsDescription = req.body.itemsDescription;
  //   // rationEvent.typeOfRation = req.body.typeOfRation;
  //   // rationEvent.images = req.body.images;
  //   // rationEvent.supplier = req.body.supplier;
  //   // rationEvent.location = req.body.location;
  //   // rationEvent.date = req.body.date;
  //   // rationEvent.approved = req.body.approved;

  //   // rationEvent.save()
  //   // .then(() => res.status(200).json("rationEvent updated succesfully"))
  //   // .catch((error) => {
  //   //   console.log(error)
  //   //   res.status(500).json("An error occured")
  //   // })
  //   console.log('found ration event')
  //   console.log(rationEvent.name)
  // })
  // .catch((error) => {
  //   console.log(error)
  //   res.status(500).send("Cannot find ration event")
  // })
})

module.exports = router