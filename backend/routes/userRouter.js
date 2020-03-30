const router = require('express').Router();
const User = require('../models/user.model');

//Create a new user
router.route('/').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const approved = true;

  const newUser = new User({
    username,
    email,
    password,
    approved
  });

  newUser.save()
  .then(() => res.status(200).json("New user added"))
  .catch((error) => res.status(200).json('Error:' + error));
});

//Get all users DELETE OR SOMETHING!
router.route('/').get((req, res) => {
  User.find()
  .then((users) => res.status(200).json(users))
  .catch((error) => res.status(500).json('Error: ' + error));
})

//Get a specific user
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
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