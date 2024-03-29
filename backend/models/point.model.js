const mongoose = require('mongoose');

const Schema = mongoose.Schema

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
}, { _id: false });

// const Point = mongoose.model('Point', pointSchema);

module.exports = pointSchema