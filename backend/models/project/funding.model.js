const mongoose = require('mongoose')

const fundingSchema = new mongoose.Schema({
  fundingNeeded: {
    type: Number,
    required: true
  },
  fundingReceived: {
    type: Number,
    required: true
  },
  backers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }],
  fundingUsedFor: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Funding = mongoose.model('Funding', fundingSchema);

module.exports.Funding = Funding
module.exports.fundingSchema = fundingSchema