const mongoose = require('mongoose');
const supplierSchema = require('./supplier.model').supplierSchema;
const addressSchema = require('./address.model').addressSchema;

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: false
  },
  lastname: {
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
  volunteer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: false
  }],
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