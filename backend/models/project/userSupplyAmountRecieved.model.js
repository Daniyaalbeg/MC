const mongoose = require('mongoose')

const supplyAmountReceivedSchema = new mongoose.Schema({
  suppliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  userName: {
    type: String,
    required: true
  },
  userMobile: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true,
  _id: false
})

const SupplyAmountReceived = mongoose.model('SupplyAmountReceived', supplyAmountReceivedSchema)

module.exports.SupplyAmountReceived = SupplyAmountReceived
module.exports.supplyAmountReceivedSchema = supplyAmountReceivedSchema