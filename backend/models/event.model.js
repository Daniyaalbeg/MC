const mongoose = require('mongoose');
const pointSchema = require('./point.model')


const Schema = mongoose.Schema

const eventSchema = new Schema({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    description: {type: String, required: true },
    totalNumberOfItems: {type: Number, required: true},
    itemsDescription: {type: String, required: true},
    typeOfRation: {
      type: String,
      required: false
    },
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

const Event = mongoose.model('Event', eventSchema);

module.exports.Event = Event;
