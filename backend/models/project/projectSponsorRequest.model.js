const mongoose = require('mongoose')

const projectSponsorRequestSchema = new mongoose.Schema({
  requestingProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  requestedOrganisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation'
  },
  pending: {
    type: Boolean,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const ProjectSponsorRequest = mongoose.model('ProjectSponsorRequest', projectSponsorRequestSchema)

module.exports.ProjectSponsorRequest = ProjectSponsorRequest
module.exports.projectSponsorRequestSchema = projectSponsorRequestSchema