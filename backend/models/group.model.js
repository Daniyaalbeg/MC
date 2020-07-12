const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true
  },
  groupImage: {
    type: String,
    required: false
  },
  groupDescription: {
    type: String,
    required: true
  },
  groupWhatsappLink: {
    type: String,
    required: true
  },
  groupAdmin: {
    type: String,
    required: true
  },
  groupAdminContact: {
    type: String,
    required: true
  },
  groupType: {
    type: [String],
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  affiliatedOrg: {
    type: Boolean,
    required: false
  },
  groupMembers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: false
  },
  groupMembersPending: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    retuired: false
  },
  approved: {
    type: Boolean,
    required: true
  },
}, {
  timestamps: true
})

const Group = mongoose.model('Group', groupSchema);

module.exports.Group = Group
module.exports.groupSchema = groupSchema