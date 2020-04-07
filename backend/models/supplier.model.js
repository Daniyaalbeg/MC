const mongoose = require('mongoose');
const rationEventSchema = require('./rationEvent.model').rationEventSchema;

const Schema = mongoose.Schema

const supplierSchema = new Schema({
    supplierName: {
        type: String,
        required: true,
        trim: true, 
        minLength: 1
    },
    rationEvents: {
      type: [rationEventSchema],
      required: false
    },
    bankingDetails: {
      type: String,
      required: false
    },
    type: {
      type: String,
      enum: ['Individual','Organisation', 'Other'],
      default: 'Individual',
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    contactInfo: {
      type: String,
      required: false
    },
    supplierWebsite: {
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

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports.Supplier = Supplier;
module.exports.supplierSchema = supplierSchema;