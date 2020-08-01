const router = require('express').Router();
const User = require('../models/user.model');
const Organisation = require('../models/organisation.model').Organisation;
const BankingDetails = require('../models/bankingDetails.model').BankingDetails
const Address = require('../models/address.model').Address;
const verfiyToken = require('../verifyToken');

//Create an org
router.route('/create').post(verfiyToken, (req, res, next) => {
  User.findById(req.id, { password: 0}, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(500).send("There was a problem finding the user.");
    }
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
    const address = new Address({
      line1: req.body.address.line1,
      city: req.body.address.city,
      region: req.body.address.region,
      postCode: req.body.address.postCode,
      country: req.body.address.country,
    })
    const organisation = new Organisation({
      createdBy: user._id,
      name: req.body.name,
      imageURL: req.body.imageURL,
      bankingDetails: bankingDetails,
      type: req.body.type,
      areaOfWork: req.body.areaOfWork,
      description: req.body.description,
      address: address,
      contactName: req.body.contactName,
      contactNumber: req.body.contactNumber,
      contactInfo: req.body.contactInfo,
      websiteURL: req.body.websiteURL,
      facebookURL: req.body.facebookURL,
      twitterURL: req.body.twitterURL,
      instagramURL: req.body.instagramURL,
      verifiedStepA: false,
      verifiedStepB: false,
      verifiedStepC: false,
      verifiedStepD: false,
      verifiedStepE: false,
      approved: true //CHANGE TO FALSE!!!
    });

    organisation.save((err, org) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ errorDesc: "Could not save organisation", error: err })
      }

      //For the 35 users who do not have this array in the model
      if (!user.createdOrganisations) {
        user.createdOrganisations = []
      }

      user.createdOrganisations.push(org._id)
      
      user.save()
      .then(() => res.status(200).json("Success"))
      .catch((error) => res.status(500).json(error))
    })
  })
  .catch((error) => res.status(500).json(error ));
})

//Get all Orgs
router.route('/').get((req, res) => {
  Organisation.find({ approved: true})
  .lean()
  .then((orgs) => {
    return res.status(200).json(orgs)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send("An error occured")
  })
})

//Update an organisation
router.route('/update/:id').post(verfiyToken, (req, res, next) => {
  Organisation.findById(req.params.id, (err, org) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ errorDesc: "Error Occurred", error: err });
    }
    if(!org) {
      return res.status(500).json({ errorDesc: "Could not find Org"});
    }

    if (org.createdBy.toString() !== req.id) {
      console.log("Org createdBy not matching user id")
      return res.status(500).json({ errorDesc: "This org was not created by you." })
    }

    org.bankingDetails.bankName = req.body.bankingDetails.bankName
    org.bankingDetails.bankBranch = req.body.bankingDetails.bankBranch
    org.bankingDetails.accountTitle = req.body.bankingDetails.accountTitle
    org.bankingDetails.accountNumber = req.body.bankingDetails.accountNumber
    org.bankingDetails.IBAN = req.body.bankingDetails.IBAN
    org.bankingDetails.swiftCode = req.body.bankingDetails.swiftCode
    org.bankingDetails.jazzCash = req.body.bankingDetails.jazzCash
    org.bankingDetails.easyPaisa = req.body.bankingDetails.easyPaisa

    org.address.line1 = req.body.address.line1
    org.address.city = req.body.address.city
    org.address.region = req.body.address.region
    org.address.postCode = req.body.address.postCode
    org.address.country = req.body.address.country

    org.name = req.body.name
    org.imageURL = req.body.imageURL
    org.type = req.body.type
    org.areaOfWork = req.body.areaOfWork
    org.description = req.body.description
    org.contactName = req.body.contactName
    org.contactNumber = req.body.contactNumber
    org.contactInfo = req.body.contactInfo
    org.websiteURL = req.body.websiteURL
    org.facebookURL = req.body.facebookURL
    org.twitterURL = req.body.twitterURL
    org.instagramURL = req.body.instagramURL

    org.save((err, org) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ errorDesc: "Could not save updated org", error: err})
      }

      if (!org) return res.status(404).send("No org returned in save.");

      return res.status(200).json(org)
    })
  })
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