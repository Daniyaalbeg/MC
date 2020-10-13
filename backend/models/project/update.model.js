const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  images: [{
    type: String,
    required: false
  }]
}, {
  timestamps: true
})

const Update = mongoose.model('Update', updateSchema)

module.exports.Update = Update
module.exports.updateSchema = updateSchema