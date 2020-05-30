const router = require('express').Router();
const User = require('../models/user.model');
const Supplier = require('../models/supplier.model').Supplier;
const BankingDetails = require('../models/bankingDetails.model').BankingDetails
const verfiyToken = require('../verifyToken');

//Create a supplier
router.route('/create').post(verfiyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    const bankingDetails = new BankingDetails({
      bankName: req.body.bankingDetails.bankName,
      bankBranch: req.body.bankingDetails.bankBranch,
      accountTitle: req.body.bankingDetails.accountTitle,
      accountNumber: req.body.bankingDetails.accountNumber,
      IBAN: req.body.bankingDetails.IBAN,
      swiftCode: req.body.bankingDetails.swiftCode,
      jazzCash: req.body.bankingDetails.jazzCash,
      easyPaisa: req.body.bankingDetails.easyPaisa
    });
    const supplier = new Supplier({
      supplierName: req.body.supplierName,
      supplierImageURL: req.body.supplierImageURL,
      bankingDetails: bankingDetails,
      type: req.body.type,
      areaOfWork: req.body.areaOfWork,
      description: req.body.description,
      address: req.body.address,
      contactName: req.body.contactName,
      contactNumber: req.body.contactNumber,
      contactInfo: req.body.contactInfo,
      supplierWebsite: req.body.supplierWebsite,
      facebookURL: req.body.facebookURL,
      twitterURL: req.body.twitterURL,
      instagramURL: req.body.instagramURL,
      verifiedStepA: false,
      verifiedStepB: false,
      verifiedStepC: false,
      verifiedStepD: false,
      verifiedStepE: false,
    });

    user.supplier = supplier;

    user.save()
    .then(() => res.status(200).json("Success"))
    .catch((error) => res.status(500).json(error))
  })
  .catch((error) => res.status(500).json(error ));
})

//Get all suppliers
router.route('/').get((req, res) => {
  const suppliersCollected = [];
  User.find({ approved: true }, { password: 0})
  .populate('supplier.events')
  .lean()
  .then((users) => {
    users.forEach((user) => {
      if (user.supplier) {
        suppliersCollected.push(user.supplier);
      }
    })
    res.status(200).json(suppliersCollected);
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send("An error occured")
  })
})

//Update a new supplier
router.route('/update').post(verfiyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    let supplier = user.supplier;
    supplier.supplierName = req.body.supplierName;
    supplier.supplierImageURL = req.body.supplierImageURL;
    supplier.bankingDetails = req.body.bankingDetails;
    supplier.type = req.body.type;
    supplier.areaOfWork = req.body.areaOfWork;
    supplier.description = req.body.description;
    supplier.address = req.body.address;
    supplier.contactName = req.body.contactName;
    supplier.contactNumber = req.body.contactNumber;
    supplier.contactInfo = req.body.contactInfo;
    supplier.supplierWebsite = req.body.supplierWebsite;
    supplier.facebookURL = req.body.facebookURL;
    supplier.twitterURL = req.body.twitterURL;
    supplier.instagramURL = req.body.instagramURL;

    user.save()
    .then(() => res.status(200).json("Successfully updated"))
  })
  .catch((error) => res.status(500).json(error));
})

//Delete a supplier
router.route('/delete').delete(verfiyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    user.supplier = null;
    user.save()
    .then(() => res.status(200).json("Successfully deleted"))
  })
  .catch((error) => res.status(500).json(error));
})

module.exports = router;