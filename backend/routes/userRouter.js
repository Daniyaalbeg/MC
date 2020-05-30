const router = require('express').Router();
const User = require('../models/user.model');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//Create a new user
router.route('/create').post((req, res) => {
  const email = req.body.email
  const password = req.body.password;
  bcrypt.hash(password, 12)
  .then((hashedPassword) => {

    const newUser = new User({
      email: email,
      username: req.body.username,
      password: hashedPassword,
      type: [],
      supplier: null,
      volunteer: null,
      approved: false,
      verified: false
    });

    newUser.save()
    .then(() => {
      var token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: 86400
      });
      res.cookie('token', token, { maxAge: new Date(Date.now() + 6*60*60*1000), httpOnly: true, secure: false, sameSite: false})
      res.status(200).json({
        auth: true,
        token, token
      });
      email.sendVerificationEmail(newUser,
        () => {console.log("sending email")},
        () => {console.log("failed sending email")});
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 11000) {
        res.status(500).json({ errorCode: 200})
      } else {
        res.status(500).json({ errorCode: 100})
      }
    });
  })
});

//Get all users DELETE OR SOMETHING!
router.route('/').get((req, res) => {
  User.find(null, { password: 0})
  .then((users) => res.status(200).json(users))
  .catch((error) => res.status(500).json('Error: ' + error));
})

//Get a specific user
router.route('/:id').get((req, res) => {
  User.findById(req.params.id, { password: 0})
  .then((user) => { res.status(200).json(user) })
  .catch((error) => res.status(500).json("Errpr: " + error));
});

//Update a user
router.route('/:id').post((req, res) => {
  User.findById(req.params.id)
  .then((user) => {
    user.username = req.body.username;
    user.email = req.body.email;
    // user.supplier = req.body.supplier;
    user.approved = req.body.approved;

    user.save()
    .then(() => res.status(200).json("Success"))
    .catch((error) => res.status(500).json("Error: " + error));
  })
  .catch((error) => res.status(500).json('Error: ' + error));
});

//Delete a user
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => res.status(200).json("User was deleted"))
  .catch((error) => res.status(500).json("Error: " + error))
})


module.exports = router;