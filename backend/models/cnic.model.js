const mongoose = require('mongoose');

const Schema = mongoose.Schema

const cnicSchema = new Schema({
    cnicNumber: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String, 
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false
    },
    familySize: {
      type: String,
      required: false
    },
    connectedEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    otherInfo: {
      type: String,
      required: false
    },
    approved: {
      type: Boolean,
      required: true
    }
}, {
    timestamps: true,
});

const CNIC = mongoose.model('CNIC', cnicSchema);

module.exports.CNIC = CNIC;
module.exports.cnicSchema = cnicSchema;