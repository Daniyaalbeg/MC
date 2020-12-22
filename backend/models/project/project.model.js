const mongoose = require('mongoose');
const pointSchema = require('../point.model');
const commentSchema = require('./comment.model').commentSchema;
const supplySchema = require('./supply.model').supplySchema;
const fundingSchema = require('./funding.model').fundingSchema;
const updateSchema = require('./update.model').updateSchema;
const faqSchema = require('./faq.model').faqSchema;
const impactSchema = require('./impact.model').impactSchema;
const sponsorSchema = require('../sponsor.model').sponsorSchema;
const projectVolunteerSchema = require('./projectVolunteer.model').projectVolunteerSchema

const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: false
  }],
  tagline: {
    type: String,
    required: false
  },
  hashtags: [{
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
  primaryCategory: {
    type: String,
    required: true
  },
  secondaryCategories: [{
    type: String,
    required: true
  }],
  sponsors: [{
    type: sponsorSchema,
    required: false
  }],
  donors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }],

  //Impact
  impact: {
    type: impactSchema,
    required: false
  },
  //Volunteer
  volunteeringInfo: {
    type: projectVolunteerSchema,
    required: false
  },
  //Funding
  funding: {
    type: fundingSchema,
    required: false
  },
  //Supply
  supplies: [{
    type: supplySchema,
    required: false
  }],
  //Comments
  comments: [{
    type: commentSchema,
    required: false
  }],
  //Updates
  updates: [{
    type: updateSchema,
    required: false
  }],
  //FAQ
  faqs: [{
    type: faqSchema,
    required: false
  }],

  //FollowedBy
  followedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],

  createdByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdByOrganisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation',
    required: true
  },
  sponsorRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectSponsorRequest'
  }],
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

projectSchema.index({ name: 'text', tagline: 'text', description: 'text' })

const Project = mongoose.model('Project', projectSchema)

module.exports.Project = Project;
module.exports.projectSchema = projectSchema;