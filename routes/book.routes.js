const router = require("express").Router();
const User = require("../models/User.model");
const Book = require("../models/Book.model");


//create book
router.post('/', (req, res, next) => {
  const { title, bookImage,aboutBook } = req.body;
  console.log(req.body)


  const newBook = {
      title,
      bookImage,
      aboutBook,
      bookOwner: req.payload._id
  }

  Book.create(newBook)
      .then(response => res.status(201).json(response))
      .catch(err => {
          console.log("error creating book in the DB", err);
          res.status(500).json({
              message: "error creating book in the DB",
              error: err
          });
      })
});

//get books list

//get spesific book

//like book

//comment book




module.exports = router;