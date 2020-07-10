const router = require('express').Router();
const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const Group = require('../models/group.model').Group;
const verifyToken = require('../verifyToken');

router.route('/').get((req, res) => {
  Group.find({ approved: true })
  .populate('createdBy', ['supplier.supplierImageURL', 'supplier._id', 'supplier.supplierName'])
  .lean()
  .exec((err, groups) => {
    if (err) return res.status(500).json({ errDesc: "An error occuredd"})
    return res.status(200).json(groups)
  })
})

router.route('/create').post(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0 }, (err, user) => {
    if (err) {
      console.log('error 1')
      res.status(500).send("There was a problem finding the user.");
    }
    if (!user) return res.status(404).send("No user found.");

    const groupName = req.body.groupName
    //This is different from the model because a generic image upload function is used
    const groupImage = req.body.image
    const groupDescription = req.body.groupDescription
    const groupWhatsappLink = req.body.groupWhatsappLink
    const groupType = req.body.groupType
    const createdBy = user._id
    let affiliatedOrg = false
    if (req.body.affiliatedOrg && user.supplier) {
      affiliatedOrg = true
    }
    const approved = false


    const group = new Group({
      groupName,
      groupImage,
      groupDescription,
      groupWhatsappLink,
      groupType,
      createdBy,
      affiliatedOrg,
      approved
    })

    group.save((err, group) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ errorDesc: "Could not save event." });
      }
      if (user.createdGroups) {
        user.createdGroups.push(group._id)
      } else {
        user.createdGroups = []
        user.createdGroups.push(group._id)
      }

      user.save((err, user) => {
        console.log(err)
        if (err) return res.status(500).json({ errorDesc: "There was a problem saving the user." });

        return res.status(200).json('new event created')
      })
    })
  })
})

module.exports = router