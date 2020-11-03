const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sponsorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: false
  },
  sponsorID: {
    type: mongoose.Schema.Types.ObjectId,
  }
});


const Sponsor = mongoose.model('Sponsor', sponsorSchema);

module.exports.Sponsor = Sponsor;
module.exports.sponsorSchema = sponsorSchema;