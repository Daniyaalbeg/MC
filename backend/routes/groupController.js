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
    
    groups.forEach((group) => {
      if (group.privateGroup) {
        group.groupWhatsappLink = null
      }
    })
    
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
    const groupAdmin = req.body.groupAdmin
    const groupAdminContact = req.body.groupAdminContact
    const groupType = req.body.groupType
    const createdBy = user._id
    let affiliatedOrg = false
    const privateGroup = req.body.privateGroup
    if (req.body.affiliatedOrg && user.supplier) {
      affiliatedOrg = true
    }
    const approved = false


    const group = new Group({
      groupName,
      groupImage,
      groupDescription,
      groupWhatsappLink,
      groupAdmin,
      groupAdminContact,
      groupType,
      createdBy,
      affiliatedOrg,
      privateGroup,
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

router.route('/delete/:id').delete(verifyToken, (req, res, next) => {
  User.findById(req.id, { password: 0 })
  .exec((err, user) => {
    if (err) return res.status(500).json({ errorDesc: "An error occured" })
    if (!user) return res.status(500).json({ errorDesc: "Cannot find user" })

    let foundGroup = null

    for ( let i = 0; i < user.createdGroups.length; i++) {
      if (user.createdGroups[i].equals(req.params.id)) {
        foundGroup = user.createdGroups.splice(i, 1);
        break
      }
    }
    if (!foundGroup) {
      return res.status(500).send("Event not found")
    }

    user.save()
    .then(() => {
      Group.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
          console.log("error deleting event + " + req.params.id)
          return res.status(500).json({ errorDesc: "Could not delete event" })
        } else {
          return res.status(200).json("Delete succesful")
        }
        //Delete group image here
      })
    })
    .catch((err) => {
      return res.status(500).json({ errorDesc: "Could not save User"})
    })

  })
})

module.exports = router