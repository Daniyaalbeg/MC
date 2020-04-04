const router = require('express').Router();
const User = require('../models/user.model');
const Supplier = require('../models/supplier.model').Supplier;
const verfiyToken = require('../verifyToken');

//Create a supplier
router.route('/create').post(verfiyToken, (req, res, next) => {
  User.findById(req.id, (err, user) => {
    if (err) res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    const supplierName = req.body.supplierName;
    const rationEvents = req.body.rationEvents;
    const bankingDetails = req.bankingDetails;
    const type = req.body.type;
    const description = req.body.description;
    const address = req.body.address;
    const contactNumber = req.body.contactNumber;

    const supplier = new Supplier({
      supplierName: supplierName,
      rationEvents: rationEvents,
      bankingDetails: bankingDetails,
      type: type,
      description: description,
      address: address,
      contactNumber: contactNumber,
      contactInfo: contactInfo,
      supplierWebsite: supplierWebsite
    });

    user.supplier = supplier;

    user.save()
    .then(() => res.status(200).json("Success"))
  })
  .catch((error) => res.status(500).json(error));
})

//Get all suppliers
router.route('/').get((req, res) => {
  const suppliersCollected = [];
  User.find().lean()
  .then((users) => {
    users.forEach((user) => {
      suppliersCollected.push(user.supplier);
    })
    res.status(200).json(suppliersCollected);
  })
  .catch((error) => res.status(500).json('Error: ' + error))
})

//Update a new supplier
router.route('/update').post(verfiyToken, (req, res, next) => {
  User.findById(req.id, (err, user) => {
    if (err) res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    supplier = user.supplier;
    supplier.supplierName = req.body.supplierName;
    supplier.bankingDetails = req.bankingDetails;
    supplier.type = req.body.type;
    supplier.description = req.body.description;
    supplier.address = req.body.address;
    supplier.contactNumber = req.body.contactNumber;
    supplier.contactInfo = req.body.contactInfo;
    supplier.supplierWebsite = req.body.supplierWebsite;

    user.save()
    .then(() => res.status(200).json("Successfully updated"))
  })
  .catch((error) => res.status(500).json(error));
})

//Delete a supplier
router.route('/delete').delete(verfiyToken, (req, res, next) => {
  User.findById(req.id, (err, user) => {
    if (err) res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    user.supplier = null;
    user.save()
    .then(() => res.status(200).json("Successfully deleted"))
  })
  .catch((error) => res.status(500).json(error));
})

module.exports = router;