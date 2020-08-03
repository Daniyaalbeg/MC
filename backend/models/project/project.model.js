const mongoose = require('mongoose');
const pointSchema = require('../point.model');
const commentSchema = require('./comment.model').commentSchema;
const supplySchema = require('./supply.model').supplySchema;
const fundingSchema = require('./funding.model').fundingSchema;
const updateSchema = require('./update.model').updateSchema;
const faqSchema = require('./faq.model').faqSchema;
const impactSchema = require('./impact.model').impactSchema;

const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: [{
    type: String,
    required: false
  }],
  description: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  completionDate: {
    type: Date,
    required: false
  },
  location: {
    type: pointSchema,
    required: true
  },
  //Impact
  impact: {
    type: impactSchema,
    required: true
  },
  //Volunteer

  //Funding
  funding: {
    type: fundingSchema,
    required: true
  },
  //Supply
  supplies: [{
    type: supplySchema,
    required: true
  }],
  //Comments
  comments: [{
    type: commentSchema,
    required: true
  }],
  //Updates
  updates: [{
    type: updateSchema,
    required: true
  }],
  //FAQ
  faq: [{
    type: faqSchema,
    required: true
  }],

  //FollowedBy
  followedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],

  createdBy: {
    //Store _id of the supplier
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true
  },
  approved: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

module.exports.Project = Project;
module.exports.projectSchema = projectSchema;