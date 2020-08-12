const mongoose = require('mongoose');

const Schema = mongoose.Schema

const addressSchema = new Schema({
  line1: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true 
  },
  region: {
    type: String,
    required: false
  },
  postCode: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: true
  }
},{
  _id : false
})

const Address = mongoose.model('Address', addressSchema)

module.exports.Address = Address
module.exports.addressSchema = addressSchema