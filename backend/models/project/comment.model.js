const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdById: {
    //User id
    type: String,
    required: true
  },
  createdByName: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports.Comment = Comment
module.exports.commentSchema = commentSchema