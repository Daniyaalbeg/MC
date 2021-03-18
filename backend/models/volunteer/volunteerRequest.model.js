const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const volunteerRequestSchema = new Schema(
  {
    requestingVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    projectCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },
    previousExperience: {
      type: String,
      required: false,
    },
    availability: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    declinedReason: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "DECLINED"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VolunteerRequest = mongoose.model(
  "VolunteerRequest",
  volunteerRequestSchema
);

module.exports.VolunteerRequest = VolunteerRequest;
module.exports.volunteerRequestSchema = volunteerRequestSchema;
