const mongoose = require('mongoose');
const pointSchema = require('./point.model')


const Schema = mongoose.Schema

const rationEventSchema = new Schema({
    name: { type: String, required: true },
    description: {type: String, required: true },
    totalNumberOfItems: {type: Number, required: true},
    itemsDescription: {type: String, required: true},
    images: {
      type: [String],
      required: false
    },
    location: {
      type: pointSchema,
      required: true
    },
    date: { type: Date, required: true },
    approved: {
      type: Boolean,
      required: true
    },
    people: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'CNIC',
      required: false
    }
}, {
    timestamps: true,
});

const RationEvent = mongoose.model('RationEvent', rationEventSchema);

module.exports.RationEvent = RationEvent;
module.exports.rationEventSchema = rationEventSchema;