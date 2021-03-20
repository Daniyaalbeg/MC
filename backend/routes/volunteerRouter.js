const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const User = require("../models/user.model");
const verifyToken = require("../verifyToken");
const Organisation = require("../models/organisation.model").Organisation;
const Volunteer = require("../models/volunteer/volunteer.model").Volunteer;
const verfiyToken = require("../verifyToken");
const mongoose = require("mongoose");
const db = mongoose.connection;

// Get a volunteer
router.route("/:id").get((req, res) => {
  // Santise user info
  User.findOne(
    { _id: req.params.id },
    {
      email: 0,
      cnic: 0,
      volunteering: 0,
      dob: 0,
      contactNumber: 0,
      preferredContact: 0,
    }
  )
    .populate({
      path: "volunteer.volunteering",
      select: ["status"],
      populate: {
        path: "requestedProject",
        select: ["name", "images", "tagLine"],
      },
    })
    .lean()
    .then((user) => {
      if (!user) res.status(404).json({ errorDesc: "User does not exist " });

      if (user.volunteer) {
        delete user.volunteer.email;
        delete user.volunteer.cnic;
        // delete user.volunteer.dob;
        delete user.volunteer.email;
        delete user.volunteer.contactNumber;
        delete user.volunteer.preferredContact;
        delete user.volunteer.isPrivate;

        if (user.volunteer.volunteering) {
          user.volunteer.volunteering = user.volunteer.volunteering.flatMap(
            (v) => {
              if (v.status === "ACCEPTED") return [v.requestedProject];
              return [];
            }
          );
        }

        return res.status(200).json(user.volunteer);
      } else
        return res.status(404).json({ errorDesc: "User does not volunteer " });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorDesc: "An error occured" });
    });
});

//Get all volunteers
router.route("/").get((req, res) => {
  const searchOptions = {
    // "user.volunteer": "asd",
    // "user.volunteer.isPrivate": false,
    // published: true
  };

  // if (req.query.filterCategory !== "all" && req.query.search !== "") {
  //   searchOptions.primaryCategory = req.query.filterCategory
  //   searchOptions.$text = {
  //     $search: req.query.search
  //   }
  // } else if (req.query.filterCategory !== "all") {
  //   searchOptions.primaryCategory = req.query.filterCategory
  // } else if (req.query.search !== "") {
  //   searchOptions.$text = {
  //     $search: req.query.search
  //   }
  // }

  User.find(searchOptions, {
    email: 0,
    cnic: 0,
    volunteering: 0,
    dob: 0,
    contactNumber: 0,
    preferredContact: 0,
  })
    .lean()
    .then((users) => {
      const volunteers = users.flatMap((user) => {
        if (user.volunteer) {
          user.volunteer.parentId = user._id;
          return [user.volunteer];
        } else return [];
      });
      return res.status(200).json(volunteers);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occured");
    });
});

//Create a volunteer when user exists
router.route("/create").post(verifyToken, (req, res, next) => {
  User.findById(req.id, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send("There was a problem finding the user.");
    }
    if (!user) return res.status(404).send("No user found.");

    const volunteer = new Volunteer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      cnic: req.body.cnic,
      tagLine: req.body.tagLine,
      image: req.body.image,
      dob: req.body.dob,
      gender: req.body.gender,
      about: req.body.about,
      contactNumber: req.body.contactNumber,
      educationLevel: req.body.educationLevel,
      employmentStatus: req.body.employmentStatus,
      disability: req.body.disability,
      haveSmartPhone: req.body.haveSmartPhone,
      vehicle: req.body.vehicle,
      preferredContact: req.body.preferredContact,
      city: req.body.city,
      country: req.body.country,
      languages: req.body.languages,
      skills: req.body.skills,
      interests: req.body.interests,
      volunteering: [],
      isPrivate: req.body.isPrivate,
    });

    user.volunteer = volunteer;
    user.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem saving the user.");
      }
      if (!user) return res.status(404).send("No user found.");

      return res.status(200).send("success");
    });
  });
});

//Update volunteer
router.route("/update").post(verifyToken, (req, res, next) => {
  User.findById(req.id, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send("There was a problem finding the user.");
    }
    if (!user) return res.status(404).send("No user found.");

    const volunteer = new Volunteer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      cnic: req.body.cnic,
      tagLine: req.body.tagLine,
      image: req.body.image,
      dob: req.body.dob,
      gender: req.body.gender,
      about: req.body.about,
      contactNumber: req.body.contactNumber,
      educationLevel: req.body.educationLevel,
      employmentStatus: req.body.employmentStatus,
      disability: req.body.disability,
      haveSmartPhone: req.body.haveSmartPhone,
      vehicle: req.body.vehicle,
      preferredContact: req.body.preferredContact,
      city: req.body.city,
      country: req.body.country,
      languages: req.body.languages,
      skills: req.body.skills,
      interests: req.body.interests,
      volunteering: user.volunteer.volunteering,
      isPrivate: req.body.isPrivate,
    });

    user.volunteer = volunteer;
    user.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send("There was a problem saving the user.");
      }
      if (!user) return res.status(404).send("No user found.");

      return res.status(200).send("success");
    });
  });
});

//Create a volunteer when user does not exist
//Inside user router

module.exports = router;
