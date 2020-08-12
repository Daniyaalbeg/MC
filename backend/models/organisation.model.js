const mongoose = require('mongoose');
const bankingDetailsSchema = require('./bankingDetails.model').bankingDetailSchema;
const addressSchema = require('./address.model').addressSchema;


const Schema = mongoose.Schema

const organisationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        minLength: 1
    },
    imageURL: {
      type: String,
      required: false
    },
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: false
    }],
    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Project',
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
      type: addressSchema,
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
    websiteURL: {
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
    },
    verifiedStepA: {
      type: Boolean,
      required: true
    },
    verifiedStepB: {
      type: Boolean,
      required: true
    },
    verifiedStepC: {
      type: Boolean,
      required: true
    },
    verifiedStepD: {
      type: Boolean,
      required: true
    },
    verifiedStepE: {
      type: Boolean,
      required: true
    },
    approved: {
      type: Boolean,
      required: true
    }
}, {
    timestamps: true,
});

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports.Organisation = Organisation;
module.exports.organisationSchema = organisationSchema;