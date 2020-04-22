const mongoose = require('mongoose');
const supplierSchema = require('./supplier.model').supplierSchema;

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
  supplier: {
    type: supplierSchema,
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