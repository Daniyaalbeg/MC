const mongoose = require('mongoose');
const pointSchema = require('./point.model')


const Schema = mongoose.Schema

const rationEventSchema = new Schema({
    name: { type: String, required: true },
    description: {type: String, required: true },
    location: {
      type: pointSchema,
      required: true
    },
    date: { type: Date, required: true },
    approved: {
      type: Boolean,
      required: true
    }
}, {
    timestamps: true,
});

const RationEvent = mongoose.model('RationEvent', rationEventSchema);

module.exports = RationEvent
module.exports = rationEventSchema