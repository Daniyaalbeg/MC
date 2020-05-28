const mongoose = require('mongoose');

const Schema = mongoose.Schema

const volunteerSchema = new Schema({
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  commitment: {
    type: Number,
    required: true
  },

}, {
  timestamps: true
})

const Volunteer = mongoose.model('Volunteer', volunteerSchema)

module.exports = Volunteer