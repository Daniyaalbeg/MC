const mongoose = require('mongoose');

const Schema = mongoose.Schema

const cnicSchema = new Schema({
    cnicNumber: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    contactNumber: {
      type: String, 
      required: false,
    },
    gender: {
      type: String,
      enum: ['m', 'f', 'o'],
      default: 'f',
      required: false
    },
    familySize: {
      type: Number,
      required: false
    },
    otherInfo: {
      type: String,
      required: false
    }
}, {
    timestamps: true,
});

const CNIC = mongoose.model('CNIC', cnicSchema);

module.exports.CNIC = CNIC;
module.exports.cnicSchema = cnicSchema;