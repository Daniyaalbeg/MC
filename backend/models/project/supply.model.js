const mongoose = require('mongoose')

const supplySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amountNeeded: {
    type: Number,
    required: true
  },
  amountAquired: {
    type: Number,
    required: true
  },
  aquired: {
    type: Boolean,
    required: false
  },
  supplyReceived: {
    type: Boolean,
    required: false
  },
  suppliedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }]
}, {
  timestamps: true
})

const Supply = mongoose.model('Supply', supplySchema)

module.exports.Supply = Supply
module.exports.supplySchema = supplySchema