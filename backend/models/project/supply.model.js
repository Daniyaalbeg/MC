const mongoose = require('mongoose')
const supplyAmountReceivedSchema = require('./userSupplyAmountRecieved.model').supplyAmountReceivedSchema;

const supplySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  amountNeeded: {
    type: Number,
    required: true
  },
  amountReceived: {
    type: Number,
    required: true
  },
  supplyReceived: {
    type: Boolean,
    required: false
  },
  suppliedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupplyAmountReceived',
    required: false
  }]
}, {
  timestamps: true
})

const Supply = mongoose.model('Supply', supplySchema)

module.exports.Supply = Supply
module.exports.supplySchema = supplySchema