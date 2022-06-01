const router = require("express").Router();
const User = require("../models/User.model");
const Summery = require("../models/Summery.model");
const Comment = require('../models/Comment.model');



//Create Summery
router.post('/:bookId', (req, res, next) => {
  const { title,aboutSummery, summeryImage ,summeryContent } = req.body;

  const newSummery = {
      title,
      summeryImage,
      summeryContent,
      aboutSummery,
      summeryOwner: req.payload._id,
      refrenceBook:req.params.bookId
  }

  Summery.create(newSummery)
      .then(response => res.status(201).json(response))
      .catch(err => {
          console.log("error creating summery in the DB", err);
          res.status(500).json({
              message: "error creating summery in the DB",
              error: err
          });
      })
});


//Get Summeries list

//get Summery detail


//Edit Summery

//like summery

//Delete Summery



//create comment

//remove comment

//edit comment

//like comment










module.exports = router;