const router = require('express').Router();
const { Organisation } = require('../models/organisation.model');
const User = require('../models/user.model');
const verifyToken = require('../verifyToken');
const { Project } = require('../models/project/project.model');
const { Supply } = require('../models/project/supply.model');
const mongoose = require('mongoose');

//Fetch all projects
router.route('/').get((req, res) => {

})

//Create a project
router.route('/:id').post(verifyToken, (req, res, next) => {
  Organisation.findById(req.params.id, (err, org) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ errorDesc: "Error finding org" })
    }
    if (!org) return res.status(400).json({ errorDesc: "Org found but missing" })

    if (org.createdBy.toString() !== req.id) {
      return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
    }

    if (req.body.orgID !== org._id.toString()) {
      return res.status(400).json({ errorDesc: "Org id's do not match" })
    }

    const name = req.body.name
    const images = req.body.images
    const description = req.body.description
    const problem = req.body.problem
    const solution = req.body.solution
    const completionDate = req.body.completionDate
    const location = req.body.location

    const impact = null
    const funding = null
    const supplies = []
    const updates = []
    const followedBy = []
    const comments = []
    const faq = []

    const createdByUser = mongoose.Types.ObjectId(req.id)
    const createdByOrganisation = org._id
    const published = false
    const approved = false

    const project = new Project({
      name,
      images,
      description,
      problem,
      solution,
      completionDate,
      location,
      impact,
      funding,
      supplies,
      updates,
      followedBy,
      comments,
      faq,
      createdByUser,
      createdByOrganisation,
      published,
      approved
    })

    project.save((err, project) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ errDesc: "Error saving the project", error: err })
      }
      if (!project) return res.status(500).json({ errDesc: "Project saved but not returned" })

      org.projects.push(project._id)
      org.save((err, org) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ errDesc: "Problem saving the org", error: err })
        }

        return res.status(200).json(project)
      })
    })
  })

})

router.route('/supply/:id/').post(verifyToken, (req, res, next) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ errorDesc: "Error finding project" })
    }
    if (!project) return res.status(400).json({ errorDesc: "Project found but missing" })

    if (project.createdByUser.toString() !== req.id) {
      console.log(project.createdByUser)
      console.log(req.id)
      return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
    }

    const supply = new Supply({
      name: req.body.name,
      category: req.body.category,
      amountNeeded: req.body.amountNeeded,
      amountReceived: req.body.amountReceived,
      supplyReceived: false,
      suppliedBy: []
    })

    project.supplies.push(supply)

    project.save()
    .then((project) => {
      return res.status(200).json(supply)
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ errorDesc: "Error saving the project" })
    })

  })
})

module.exports = router