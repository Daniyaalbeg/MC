const mongoose = require('mongoose');
const supplierSchema = require('./supplier.model').supplierSchema;
const addressSchema = require('./address.model').addressSchema;

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
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
  supplier: {
    type: supplierSchema,
    required: false
  },
  volunteer: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Volunteer',
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