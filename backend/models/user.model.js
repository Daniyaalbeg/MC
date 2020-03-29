const mongoose = require('mongoose');
const supplierSchema = require('./supplier.model');

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  },
  supplier: {
    type: supplierSchema,
    required: false
  },
  approved: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User