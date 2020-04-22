const mongoose = require('mongoose');
const rationEventSchema = require('./rationEvent.model').rationEventSchema;
const bankingDetailsSchema = require('./bankingDetails.model').bankingDetailSchema;

const Schema = mongoose.Schema

const supplierSchema = new Schema({
    supplierName: {
        type: String,
        required: true,
        trim: true, 
        minLength: 1
    },
    supplierImageURL: {
      type: String,
      required: false
    },
    rationEvents: {
      type: [rationEventSchema],
      required: false
    },
    bankingDetails: {
      type: bankingDetailsSchema,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    areaOfWork: {
      type: [String],
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
    contactName: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
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
    facebookURL: {
      type: String,
      required: false
    },
    twitterURL: {
      type: String,
      required: false
    },
    instagramURL: {
      type: String,
      required: false
    }
}, {
    timestamps: true,
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports.Supplier = Supplier;
module.exports.supplierSchema = supplierSchema;