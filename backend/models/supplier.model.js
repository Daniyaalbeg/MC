const mongoose = require('mongoose');
const rationEventSchema = require('./rationEvent.model').rationEventSchema;

const Schema = mongoose.Schema

const supplierSchema = new Schema({
    supplierName: {
        type: String,
        required: true,
        trim: true, 
        minLength: 3
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
      enum: ['Person','Organisation', 'Other'],
      default: 'Person',
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
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