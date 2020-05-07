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
    const typeOfRation = req.body.typeOfRation;
    const images = req.body.images;
    const location = req.body.location;
    const date = req.body.date;
    const approved = false;

    const newRationEvent = new RationEvent({
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

    user.supplier.rationEvents.push(newRationEvent);

    user.save()
    .then(() => {
      res.json('New ration event created')
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json("An error occured")
    });
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
  .catch((error) => {
    console.log(error)
    res.status(500).json("An error occured")
  });
});

//Get specific event by id
router.route('/:id').get((req, res) => {
  User.find(null, { password: 0})
  .then((users) => {
    users.forEach((user) => {
      const rationEvents = user.supplier.rationEvents;
      rationEvents.forEach((rationEvent) => {
        if (rationEvent._id == req.params.id) {
          return res.status(200).send(rationEvent);
        }
      });
    });
    // return res.status(404).json("Requested resource not found");
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send("An error occured")
  });
})

//Delete a specific ration event
router.route('/:id').delete(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) res.status(500).json("There was a problem finding the ration event/");
    if (!user) res.status(500).json("There was a problem finding your user.")

    const rationEvents = user.supplier.rationEvents;
    // rationEvents.forEach((rationEvent, index, object) => {
    //   if (rationEvent._id === req.params.id) {
    //     object.splice(index, 1);
    //   }
    // });
    let rationEventFound = false
    for ( let i = 0; i < rationEvents.length; i++) {
      // console.log(rationEvents[i]._id+'-'+req.params.id)
      if (rationEvents[i]._id.equals(req.params.id)) {
        rationEventFound = true
        rationEvents.splice(i, 1);
        break
      }
    }
    if (!rationEventFound) {
      return res.status(500).send("Ration Event not found")
    }
    user.save()
    .then(() => {
      res.status(200).json("Delete succesful")
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send("User could not be saved")
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json("An error occured")
  });
})


//Update a ration event
router.route('/update/:id').post(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
  

    const supplier = user.supplier;
    const rationEvents = supplier.rationEvents;
    for( let i =0; i< rationEvents.length; i++) {
      if (rationEvents[i]._id.equals(req.params.id)) {
        rationEvents[i].name = req.body.name;
        rationEvents[i].description = req.body.description;
        rationEvents[i].totalNumberOfItems = req.body.totalNumberOfItems;
        rationEvents[i].itemsDescription = req.body.itemsDescription;
        rationEvents[i].typeOfRation = req.body.typeOfRation;
        rationEvents[i].images = req.body.images;
        rationEvents[i].location = req.body.location;
        rationEvents[i].date = req.body.date;

        user.save()
        .then(() => {
          return res.status(200).json("rationEvent updated succesfully")
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json("An error occured")
        }) 
      }
    }
    // return res.status(500).json("No ration event found");
  });
  
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