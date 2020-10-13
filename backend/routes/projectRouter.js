const router = require('express').Router();
const { Organisation } = require('../models/organisation.model');
const User = require('../models/user.model');
const verifyToken = require('../verifyToken');
const { Project } = require('../models/project/project.model');
const { Supply } = require('../models/project/supply.model');
const { FAQ } =require('../models/project/faq.model');
const { Comment } = require('../models/project/comment.model');
const { SupplyAmountReceived } = require('../models/project/userSupplyAmountRecieved.model')
const mongoose = require('mongoose');
const { Update } = require('../models/project/update.model');
const { Funding } = require('../models/project/funding.model');

//Map fetch projects
router.route('/map').get((req, res) => {
  const searchOptions = {
    approved: true,
    published: true 
  }

  if (req.query.filterCategory !== "all" && req.query.search !== "") {
    searchOptions.primaryCategory = req.query.filterCategory
    searchOptions.$text = {
      $search: req.query.search
    }
  } else if (req.query.filterCategory !== "all") {
    searchOptions.primaryCategory = req.query.filterCategory
  } else if (req.query.search !== "") {
    searchOptions.$text = {
      $search: req.query.search
    }
  }

  Project.find(searchOptions, { createdByUser: 0})
    .populate('createdByOrganisation', ['name', 'imageUrl'])
    .lean()
    .then((projects) => {
      return res.status(200).json(projects)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send("An error occured")
    })
})

// Fetch all projects
router.route('/').get((req, res) => {
  Project.find({ approved: true, published: true }, { createdByUser: 0 })
  .populate('createdByOrganisation', ['name', 'imageUrl'])
  .lean()
  .then((projects) => {
    return res.status(200).json(projects)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send("An error occured")
  })
})

// Fetch a project
router.route('/:id').get((req, res) => {
  //Santise the project info
  Project.findById(req.params.id, { createdByUser: 0, followedBy: 0 }, { approved: true, published: true })
  .populate('createdByOrganisation', ['name', 'imageURL', 'contactName', 'contactNumber', 'bankingDetails'])
  .lean()
  .then((project) => {
    return res.status(200).json(project)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({ errorDesc: "An error occured" })
  })
})

// Publish Project
router.route('/publish/:id/').post(verifyToken, (req, res, next) => {
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

    project.published = true

    project.save()
    .then((project) => {
      return res.status(200).json()
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ errorDesc: "Error saving the project" })
    })

  })
})

// Create a new project comment
router.route('/:id/comment').post(verifyToken, (req, res, next) => {
  User.findById(req.id, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ errorDesc: "Error finding user" })
    }
    if (!user) return res.status(400).json({ errorDesc: "User found but missing" })

    Project.findById(req.params.id, (err, project) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ errorDesc: "Error finding project" })
      }
      if (!project) return res.status(400).json({ errorDesc: "Project found but missing" })
  
      const comment = new Comment({
        content: req.body.content,
        createdById: req.id,
        createdByName: user.username
      })
  
      project.comments.unshift(comment)
  
      project.save()
      .then((project) => {
        return res.status(200).json(comment)
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ errorDesc: "Error saving the project" })
      })
  
    })

  })
})

// Create a project
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
    const tagline = req.body.tagline
    const hastags = req.body.hastags
    const description = req.body.description
    const problem = req.body.problem
    const solution = req.body.solution
    const completionDate = req.body.completionDate
    const location = req.body.location
    const primaryCategory = req.body.primaryCategory
    const secondaryCategories = req.body.secondaryCategories

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
      tagline,
      hastags,
      description,
      problem,
      solution,
      completionDate,
      location,
      primaryCategory,
      secondaryCategories,
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

// Create supply
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
      description: req.body.description,
      category: req.body.category,
      amountNeeded: parseInt(req.body.amountNeeded),
      amountReceived: parseInt(req.body.amountReceived),
      supplyReceived: false,
      suppliedBy: []
    })

    project.supplies.unshift(supply)

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

// Create funding 
router.route('/funding/:id/').post(verifyToken, (req, res, next) => {
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

    let funding = null
    if (project.funding && project.funding.fundingNeeded) {
      funding = new Funding({
        fundingNeeded: req.body.fundingNeeded,
        fundingReceived: project.funding.fundingReceived,
        fundingUsedFor: req.body.fundingUsedFor,
        backers: project.funding.backers
      })  
    } else {
      funding = new Funding({
        fundingNeeded: req.body.fundingNeeded,
        fundingReceived: 0,
        fundingUsedFor: req.body.fundingUsedFor,
        backers: []
      })
    }

    project.funding = funding

    project.save()
    .then((project) => {
      return res.status(200).json(funding)
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ errorDesc: "Error saving the project" })
    })

  })
})


// Create an FAQ
router.route('/faq/:id/').post(verifyToken, (req, res, next) => {
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

    const faq = new FAQ({
      question: req.body.question,
      answer: req.body.answer
    })

    project.faqs.push(faq)

    project.save()
    .then((project) => {
      return res.status(200).json(faq)
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ errorDesc: "Error saving the project" })
    })

  })
})

// Delete an FAQ
router.route('/faq/:projectID/:faqID').delete(verifyToken, (req, res, next) => {
  Project.findById(req.params.projectID, (err, project) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ errorDesc: "Error finding project" })
    }
    if (!project) return res.status(400).json({ errorDesc: "Project found but missing" })

    if (project.createdByUser && project.createdByUser.toString() !== req.id) {
      return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
    }

    if (!project.faqs || project.faqs.length === 0) {
      return res.status(500).json({ errorDesc: "No FAQ to delete" })
    }

    let deletedFaq = null
    for (let i = 0; i < project.faqs.length; i++) {
      if (project.faqs[i]._id.toString() === req.params.faqID.toString()) {
        deletedFaq = project.faqs.splice(i, 1)[0]
        break;
      }
    }

    if (!deletedFaq) {
      return res.status(500).json({ errorDesc: "Could not find FAQ to delete" })
    }

    project.save()
    .then((project) => {
      return res.status(200).json(deletedFaq)
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ errorDesc: "Error saving the project" })
    })

  })
})


// Create a new update
router.route('/update/:id/').post(verifyToken, (req, res, next) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ errorDesc: "Error finding project" })
    }
    if (!project) return res.status(400).json({ errorDesc: "Project found but missing" })

    if (project.createdByUser.toString() !== req.id) {
      return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
    }

    const update = new Update({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      images: req.body.images
    })

    project.updates.unshift(update)

    project.save()
    .then((project) => {
      return res.status(200).json(update)
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ errorDesc: "Error saving the project" })
    })

  })
})


// Public Project related calls

// Create Supply Request
router.route('/supplyRequest/:projectID/:supplyID').post(verifyToken, (req, res, next) => {
  Project.findById(req.params.projectID, (err, project) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ errorDesc: "Error finding project" })
    }
    if (!project) return res.status(400).json({ errorDesc: "Project found but missing" })

    // if (project.createdByUser.toString() !== req.id) {
    //   return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
    // }

    const supplyAmount = new SupplyAmountReceived({
      description: req.body.description,
      suppliedBy: req.id,
      projectCreator: project.createdByUser,
      username: req.body.username,
      mobile: req.body.mobile,
      contactDetails: req.body.contactDetails,
      amount: parseInt(req.body.amount),
      canDeliver: req.body.canDeliver,
      location: req.body.location ? req.body.location : null,
      accepted: false
    })

    supplyAmount.save((err, savedSupplyAmount) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ errorDesc: "Error saving Supply amount" })
      }

      for (let i = 0; i < project.supplies.length; i++) {
        if (project.supplies[i]._id.toString() === req.params.supplyID) {
          project.supplies[i].suppliedBy.unshift(savedSupplyAmount)
          break;
        }
      }

      project.save()
      .then((project) => {
        return res.status(200).json(savedSupplyAmount)
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ errorDesc: "Error saving the project" })
      })
    })
  })
})


// Accept supply request made
router.route('/acceptSupplyRequest/:projectID/:supplyID/:supplyRequestID/').post(verifyToken, (req, res, next) => {
  SupplyAmountReceived.findById(req.params.supplyRequestID, (err, supplyRequest) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ errorDesc: "Error finding supply request" })
    }
    if (!supplyRequest) return res.status(400).json({ errorDesc: "Supply request found but missing" })

    if (supplyRequest.projectCreator.toString() !== req.id) {
      return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
    }

    Project.findById(req.params.projectID, (err, project) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ errorDesc: "Error finding project" })
      }
      if (!project) return res.status(400).json({ errorDesc: "Project found but missing" })
  
      if (project.createdByUser.toString() !== req.id) {
        return res.status(401).json({ errorDesc: "Not authorised to perform this action." })
      }

      for (let i = 0; i < project.supplies.length; i++) {
        if (project.supplies[i]._id.toString() === req.params.supplyID) {
          project.supplies[i].amountReceived = parseInt(project.supplies[i].amountReceived) + parseInt(supplyRequest.amount)
        }
      }

      project.save()
      .then((project) => {

        supplyRequest.accepted = true

        supplyRequest.save()
        .then((supplyRequest) => {
          return res.status(200).json(supplyRequest)
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ errorDesc: "Error saving the project" })
        })

      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ errorDesc: "Error saving the project" })
      })

    })
  })
})


module.exports = router