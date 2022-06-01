const router = require("express").Router();
const User = require("../models/User.model");



//Get User Detail
router.get('/:userId',  (req, res, next) => {
  User.findById(req.params.userId,{"password":0,"isAdmin":0})
  // .populate('favBook')
  // .populate('favSummery')
    .then(userDetail => res.status(200).json(userDetail))
    .catch(e => console.log('error finding user', e))
})



//Update user detail
router.put('/:userId',(req, res, next) => {
  const { userId } = req.params;
  if (req.payload._id == userId) {
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then(response => res.status(200).json("user has been updated"))
      .catch(err => {
        console.log("error updating user in the DB", err);
        res.status(500).json({
          message: "error updating user in the DB",
          error: err
        })
      })
  } else {
    return res.status(403).json("you can't update another users data");
  }
})



//

module.exports = router;