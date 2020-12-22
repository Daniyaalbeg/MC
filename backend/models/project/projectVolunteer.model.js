const mongoose = require('mongoose');

const Schema = mongoose.Schema

const projectVolunteerSchema = new Schema({
  volunteersNeeded: {
    type: Number,
    required: true
  },
  volunteersObtained: {
    type: Number,
    required: true
  },
  volunteerRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteerRequest',
    required: true
  }],
  skills: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },

}, {
  timestamps: true
})



const ProjectVolunteer = mongoose.model('ProjectVolunteer', projectVolunteerSchema)

module.exports.ProjectVolunteer = ProjectVolunteer;
module.exports.projectVolunteerSchema = projectVolunteerSchema;