const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required : true
    },
    bookImage:String,
    bookLikes: {
      type: [Schema.Types.ObjectId],
      ref: "User"
    },
    bookComments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment"
    },
    author: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;
