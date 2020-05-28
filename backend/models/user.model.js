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
  type: {
    type: String,
    enum: ['supplier', 'volunteer', 'user'],
    required: true
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