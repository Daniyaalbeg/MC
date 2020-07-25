const router = require('express').Router();
const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const verifyToken = require('../verifyToken');
const { Project } = require('../models/project/project.model');

//Fetch all projects
router.route('/').get((req, res) => {

})

//Create a project
router.route('/').post(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0 }, (err, user) => {
    if (err) return res.status(400).json({ errorDesc: "Error finding user", error: err })
    if (!user) return res.status(400).json({ errorDesc: "User found but missing" })

    if (!user.supplier) return res.status(400).json({ errorDesc: "You must have created an organistion before adding projects" })

    const name = req.body.name
    const imageURL = req.body.imageURL
    const description = req.body.description
    const problem = req.body.problem
    const solution = req.body.solution
    const completionDate = req.body.completionDate
    const location = req.body.location

    const impact = []
    const funding = []
    const supplies = []
    const updates = []
    const followedBy = []
    const comments = []
    const faq = []

    const createdBy = user._id
    const published = false
    const approved = false

    const project = new Project({
      name,
      imageURL,
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
      createdBy,
      published,
      approved
    })

    project.save((err, project) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ errDesc: "Error saving the project", error: err })
      }
      if (!project) return res.status(500).json({ errDesc: "Project saved but not returned" })

      user.supplier.projects.append(project._id)
      user.save((err, user) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ errDesc: "Problem saving the user", error: err })
        }

        return res.status(200).json({ project })
      })

    })

  })
})

module.exports = router