var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../verifyToken');

var CNIC = require('../models/cnic.model').CNIC;

router.route('/:id').get(verifyToken, (req, res, next) => {
  console.log(req.params.id.toString().replace(/\D/g,''))
  CNIC.findOne({ cnicNumber: req.params.id.toString().replace(/\D/g,'')})
  .populate('connectedEvents')
  .exec((err, cnic) => {
    if (err) {
      console.log(err)
      return res.status(500).send('An error occurred')
    }
    if (!cnic) { return res.status(500).json({
      code: 100,
      message: "That CNIC number does not exist in our system or has not recieved any ration"
    })}

    console.log(cnic)
    return res.status(200).send(cnic)
  })
})

//create new cnic
router.route('/upload').post(verifyToken, (req, res, next) => {
  const eventID = req.body.eventID
  const createdByID = req.body.createdByID
  const newCnic = [...req.body.cnicInfo]
  newCnic.splice(0,1)

  const promises = []
  const savePromises = []

  newCnic.forEach((cnicToAdd) => {
    promises.push(
      CNIC.findOne({ cnicNumber: cnicToAdd[0].toString().replace(/\D/g,'')}, (err, cnic) => {
        if (err) { 
          console.log(err)
        }
        if (cnic) {
          //add to old cnic
          cnic.connectedEvents.push(eventID)
        } else {
          //create new cnic
          const cnicNumber = cnicToAdd[0].toString().replace(/\D/g,'');
          const name = cnicToAdd[1] !== null ? cnicToAdd[1] : "no info";
          const contactNumber = cnicToAdd[2] !== null ? cnicToAdd[2] : "no info";
          const address = cnicToAdd[3] !== null ? cnicToAdd[3] : "no info";
          const dob = cnicToAdd[4] !== null ? cnicToAdd[4] : "no info";
          const familySize = cnicToAdd[5] !== null ? cnicToAdd[5] : "no info";
          const gender = cnicToAdd[6] !== null ? cnicToAdd[6] : "no info";
          const otherInfo = cnicToAdd[7] !== null ? cnicToAdd[7] : "no info";
          const connectedEvents = [eventID]
          const createdBy = createdByID
          const approved = false

          cnic = new CNIC({
            cnicNumber,
            name,
            contactNumber,
            address,
            dob,
            familySize,
            gender,
            otherInfo,
            connectedEvents,
            createdBy,
            approved
          })
        }

        savePromises.push(
          cnic.save()
        )
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ errorCode: 400, message: "Please contact support or try uploading your file directly"})
      })
    )
  })

  let failedIDs = []
  Promise.all(promises)
  .then((responses) => {
    Promise.allSettled(savePromises)
    .then((results) => {
      results.forEach((result, index) => {
        console.log(result)
        if (result === 'rejected') {
          failedIDs.push(index) 
        }
      })
      console.log('successcnic')
      return res.status(200).json({
        failedIDs: failedIDs
      })
    })
    .catch((error) => {
      console.log(error)
      console.log('second error')
      return res.status(500).send("error")
    });
  })
  .catch((error) => {
    console.log('failure')
    console.log(error)
    return res.status(500).send("error")
  });
})

router.route('/uploadFile').post(verifyToken, (req, res, next) => {

})

module.exports = router