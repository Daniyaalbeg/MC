const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: false,
    },
    tagLine: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    about: {
      type: String,
      required: false,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      required: false,
      enum: ["primary", "secondary", "other"],
    },
    employmentStatus: {
      type: String,
      enum: [
        "HOME-MAKER",
        "PRIVATE-SECTOR",
        "PUBLIC-SECTOR",
        "GOVERNMENT",
        "PART-TIME",
        "STUDENT",
        "UNEMPLOYED",
        "RETIRED",
        "SELF-EMPLOYED",
        "OTHER",
      ],
      required: true,
    },
    disability: {
      type: String,
      required: false,
    },
    haveSmartPhone: {
      type: Boolean,
      required: false,
    },
    vehicle: {
      type: String,
      required: true,
    },
    preferredContact: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    languages: [
      {
        type: String,
        required: false,
      },
    ],
    skills: [
      {
        type: String,
        required: false,
      },
    ],
    interests: [
      {
        type: String,
        required: false,
      },
    ],
    isPrivate: {
      type: Boolean,
      required: true,
    },
    volunteering: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VolunteerRequest",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports.Volunteer = Volunteer;
module.exports.volunteerSchema = volunteerSchema;
