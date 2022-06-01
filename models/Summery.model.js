const { Schema, model } = require("mongoose");

const summerySchema = new Schema(
  {
    title: {
      type: String,
      required : true
    },
    summeryImage:String,
    summeryContent: String,
    summeryLikes: {
      type: [Schema.Types.ObjectId],
      ref: "User"
    },
    aboutSummery: String,
    summeryComments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment"
    },
    summeryOwner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    refrenceBook: {
      type: Schema.Types.ObjectId,
      ref: "Book"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Summery = model("Summery", summerySchema);

module.exports = Summery;
