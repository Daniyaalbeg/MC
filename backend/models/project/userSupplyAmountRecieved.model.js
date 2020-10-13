const mongoose = require('mongoose')

const pointSchema = require('../point.model');

const supplyAmountReceivedSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  suppliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  projectCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
  },
  contactDetails: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: true
  },
  canDeliver: {
    type: Boolean,
    required: false
  },
  location: {
    type: pointSchema,
    required: false
  },
  accepted: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const SupplyAmountReceived = mongoose.model('SupplyAmountReceived', supplyAmountReceivedSchema)

module.exports.SupplyAmountReceived = SupplyAmountReceived
module.exports.supplyAmountReceivedSchema = supplyAmountReceivedSchema