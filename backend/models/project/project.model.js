const mongoose = require('mongoose');
const pointSchema = require('./point.model')


const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: [String],
    required: false
  },
  description: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  completionDate: {
    type: Date,
    required: false
  },
  location: {
    type: pointSchema,
    required: true
  },
  //Impact

  //Volunteer

  //Fundung

  //Supply

  //Comments

  //Updates

  //Backers who funded the project

  //FAQ

  //FollowedBy
  followedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  createdBy: {
    //Store _id of the supplier
    type: String,
    required: true
  },


})

const Project = mongoose.model('Project', projectSchema)

module.exports.Project = Project;
module.exports.projectSchema = projectSchema;