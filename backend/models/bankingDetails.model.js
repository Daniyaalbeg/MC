const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bankingDetailSchema = new Schema({
  bankName: {
    type: String,
    required: false
  },
  bankBranch: {
    type: String,
    required: false
  },
  accountTitle: {
    type: String,
    required: false
  },
  accountNumber: {
    type: String,
    required: false
  },
  IBAN: {
    type: String,
    required: false
  },
  swiftCode: {
    type: String,
    required: false
  },
  jazzCash: {
    type: String,
    required: false
  },
  easyPaisa: {
    type: String,
    required: false
  }
});


const BankingDetails = mongoose.model('BankingDetails', bankingDetailSchema);

module.exports.BankingDetails = BankingDetails;
module.exports.bankingDetailSchema = bankingDetailSchema;