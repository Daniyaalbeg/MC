const mongoose = require('mongoose');

const Schema = mongoose.Schema

const cnicFileSchema = new Schema({
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    fileURL: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
}, {
    timestamps: true,
});

const CNICFile = mongoose.model('CNICFile', cnicFileSchema);

module.exports.CNICFile = CNICFile;
module.exports.cnicFileSchema = cnicFileSchema;