const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  sdg: [{
    type: String,
    required: true
  }]
})

const Impact = mongoose.model('Impact', impactSchema)

module.exports.Impact = Impact
module.exports.impactSchema = impactSchema