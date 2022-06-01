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

router.get('/',(req,res,next)=>{
  Summery.find()
  .populate('summeryOwner')
  .populate('summeryComments')
  .populate('refrenceBook')
  .populate('summeryLikes')
  .then(response => res.status(201).json(response))
  .catch(err => {
      console.log("error getting summeries list in the DB", err);
      res.status(500).json({
          message: "error getting summeries list in the DB",
          error: err
      });
  })
})

//get Summery detail

router.get('/:summeryId',(req,res,next)=>{
  const {summeryId}=req.params
  Summery.findById(summeryId)
  .populate('summeryOwner')
  .populate('summeryComments')
  .populate('refrenceBook')
  .populate('summeryLikes')
  .then(response => res.status(201).json(response))
  .catch(err => {
      console.log("error getting a summery in the DB", err);
      res.status(500).json({
          message: "error getting a summery in the DB",
          error: err
      });
  })
})


//Edit Summery
router.put('/:summeryId/edit', (req, res, next) => { 
  const { summeryId } = req.params;

  Summery.findById(summeryId)
      .then(summeryDetails => {
          if (summeryDetails.summeryOwner == req.payload._id) {
              return Summery.findByIdAndUpdate(summeryId, req.body, { new: true })
                  .then((updatedSummery) => res.status(201).json(updatedSummery))
                  .catch(err => {
                      console.log("error updating summery", err);
                      res.status(500).json({
                          message: "error updating summery",
                          error: err
                      });
                  })
          } else {
              res.status(400).json({ message: 'user is not the onwer of this summery' })
          }
      })

});



//like summery
router.put('/:summeryId', (req, res, next) => {
  const { summeryId } = req.params;
  const userId = req.payload._id;

  Summery.findById(summeryId)
      .then(summeryFound => {
          if (!summeryFound.summeryLikes.includes(userId)) {
              return Summery.findByIdAndUpdate(summeryId, { $push: { summeryLikes: userId } }, { new: true })
          } else if (summeryFound.summeryLikes.includes(userId)) {
              return Summery.findByIdAndUpdate(summeryId, { $pull: { summeryLikes: userId } }, { new: true })
          }
      })
      .then(updateSummery => res.status(201).json(updateSummery))
      .catch(err => {
          console.log("error updating likes for summery", err);
          res.status(500).json({
              message: "error updating likes for summery",
              error: err
          });
      })
})


//Delete Summery
router.delete('/:summeryId', (req, res, next) => { //isAuthenticated, <= need to be secured
  const { summeryId } = req.params;


  Summery.findById(summeryId)
      .then(summeryFound => {
          if (summeryFound.summeryOwner == req.payload._id) {
              return Summery.findByIdAndRemove(summeryId)
                  .then(deteletedsummery => {
                      return Comment.deleteMany({ _id: { $in: deteletedsummery.summeryComments } });
                  })
                  .then(() => res.json({ message: `summery with id ${summeryId} & all associated comments were removed successfully.` }))
                  .catch(err => {
                      console.log("error deleting summery", err);
                      res.status(500).json({
                          message: "error deleting summery",
                          error: err
                      });
                  })
          } else {
              res.status(403).json({ message: "You didnt create this summery" })
          }
      })
      .catch(err => {
          console.log("user is not the owner of the summery", err);
          res.status(400).json({
              message: "user is not the owner of the summery",
              error: err
          });
      });

});


//create comment
router.post('/:summeryId/comments', (req, res, next) => {
  const { summeryId } = req.params;
  const { title} = req.body;

  const newComment = {
      title,
      commentOwner: req.payload._id
  }

  Comment.create(newComment)
      .then(newComment => {
          return Summery.findByIdAndUpdate(summeryId, { $push: { summeryComments: newComment._id } }, { new: true })
      })
      .then(response => res.status(201).json(response))
      .catch(err => {
          console.log("error creating comment in the DB", err);
          res.status(500).json({
              message: "error creating comment in the DB",
              error: err
          });
      })
})



//edit comment

//like comment
router.put('/comments/:commentId', (req, res, next) => {
  const { commentId } = req.params

  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
  }

  Comment.findById(commentId)
      .then(commentFound => {
          console.log(commentFound)
          if (!commentFound.commentLikes.includes(userId)) {
              return Comment.findByIdAndUpdate(commentId, { $push: { commentLikes: userId } }, { new: true })
          } else if (commentFound.commentLikes.includes(userId)) {
              return Comment.findByIdAndUpdate(commentId, { $pull: { commentLikes: userId } }, { new: true })
          }
      })
      .then(updatedComment => res.status(201).json(updatedComment))
      .catch(err => {
          console.log("error updating likes for post", err);
          res.status(500).json({
              message: "error updating likes for post",
              error: err
          });
      })
})



//remove comment








module.exports = router;