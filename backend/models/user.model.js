const mongoose = require('mongoose');
const supplierSchema = require('./supplier.model').supplierSchema;
const addressSchema = require('./address.model').addressSchema;
const volunteerSchema = require('./volunteer/volunteer.model').volunteerSchema;

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true,
    // select: false
  },
  mobile: {
    type: String,
    required: false
  },
  cnic: {
    type: String,
    required: false
  },
  address: {
    type: addressSchema,
    required: false
  },
  createdOrganisations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation',
    required: false
  }],
  createdGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: false
  }],
  volunteer: {
    type: volunteerSchema,
    required: false
  },
  approved: {
    type: Boolean,
    required: true
  },
  verified: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User