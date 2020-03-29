const router = require('express').Router();
const Supplier = require('../models/supplier.model');

router.route('/').get((req, res) => {
  Supplier.find()
  .then((suppliers) => {

  })
  .catch((error) => res.status(500).json('Error: ' + error))
})

module.exports = router;