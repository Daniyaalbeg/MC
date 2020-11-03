const router = require('express').Router();
const { verify } = require('jsonwebtoken');
const User = require('../models/user.model');
const verifyToken = require('../verifyToken');
const Organisation = require('../models/organisation.model').Organisation;
const BankingDetails = require('../models/bankingDetails.model').BankingDetails
const Sponsor = require('../models/sponsor.model').Sponsor;
const Address = require('../models/address.model').Address;
const Project = require('../models/project/project.model').Project;
const ProjectSponsorRequest = require('../models/project/projectSponsorRequest.model').ProjectSponsorRequest
const verfiyToken = require('../verifyToken');
const mongoose = require('mongoose');
const db = mongoose.connection

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
      events: [],
      projects: [],
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
      approved: false
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

//Search Org name
router.route('/search').get(verfiyToken, (req, res, next) => {
  const searchOptions = {
    approved: true
  }

  if (req.query.search && req.query.search.length < 4) return res.status(200).json([])

  if (req.query.search !== "") {
    searchOptions.$text = {
      $search: req.query.search
    }
  }

  Organisation.find(searchOptions, 'name')
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

//Accept a sponsor Request
router.route('/sponsorRequest/:id').post(verifyToken, (req, res, next) => {
  ProjectSponsorRequest.findById(req.params.id)
  .populate('requestedOrganisation', 'name imageURL createdBy')
  .populate('requestingProject' , 'name imageURL')
  .then(async (request) => {
    if (request.requestedOrganisation.createdBy.toString() !== req.id) {
      return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
    }

    const session = await db.startSession()

    request.pending = false
    request.accepted = true

    await session.withTransaction(async () => {
      const promise = await Promise.all([
        Project.findById(request.requestingProject)
        .catch((err) => console.log(err)),
        Organisation.findById(request.requestedOrganisation)
        .catch((err) => console.log(err)),
        request.save({ session })
        .catch((err) => console.log(err)),
      ])
      .then(([project, org, request]) => {
        //handle project res
        const projectSponsor = new Sponsor({
          name: request.requestedOrganisation.name,
          imageURL: request.requestingProject.imageURL ? request.requestingProject.imageURL : null,
          sponsorID: request.requestedOrganisation._id
        })
        project.sponsors.unshift(projectSponsor)
        //handle org res
        const orgSponsor = new Sponsor({
          name: request.requestingProject.name,
          imageURL: (request.requestingProject.imageURL && request.requestingProject.imageURL.length !== 0) ? request.requestingProject.imageURL[0] : null,
          sponsorID: request.requestingProject._id
        })
        org.sponsoring.unshift(orgSponsor)

        return Promise.all([
          project.save({ session })
          .catch((err) => {
            console.log(err)
            session.abortTransaction()
            return res.status(500).json({ errorDesc: "Something went wrong."})
          }),
          org.save({ session })
          .catch((err) => {
            console.log(err)
            session.abortTransaction()
            return res.status(500).json({ errorDesc: "Something went wrong."})
          }),
        ])
        .then((responses) => {
          return res.status(200).send("success")
        })
        .catch((err) => {
          console.log(err)
          session.abortTransaction()
          return res.status(500).json({ errorDesc: "Something went wrong."})
        })
      })
      .catch((err) => {
        console.log(err)
        session.abortTransaction()
        return res.status(500).json({ errorDesc: "Something went wrong."})
      })
    })
    
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ errorDesc: "There was a problem finding the sponsor request." });
  })

})

//Decline a sponsor request
router.route('/sponsorRequest/:id').delete(verifyToken, (req, res, next) => {
  console.log('delete');
  ProjectSponsorRequest.findById(req.params.id)
  .populate('requestedOrganisation', 'createdBy')
  .then(async (request) => {
    if (request.requestedOrganisation.createdBy.toString() !== req.id) {
      return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
    }

    const session = await db.startSession()

    ProjectSponsorRequest.findById({ _id: request._id }, async (err, request) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ errorDesc: "An error occurred"})
      }

      request.pending = false
      request.accepted = false

      await session.withTransaction(() => {
        return request.save({ session })
        .then(() => {
          return res.status(200).send("Success")
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ errorDesc: "An error occurred"})      
        })
      })

    })

  })
  .catch((err) => {
    if (err) res.status(500).json({ errorDesc: "There was a problem finding the request." });
  })
})

module.exports = router;