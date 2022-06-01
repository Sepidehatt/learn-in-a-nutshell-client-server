const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    commentLikes: {
      type: [Schema.Types.ObjectId],
      ref: "User"
    },
    commentOwner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
