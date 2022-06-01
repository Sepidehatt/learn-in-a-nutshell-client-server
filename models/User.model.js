const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: true,
      required: true
    },
    profileImage: String,
    aboutMeme: String,
    isAdmin: {
      type: Boolean,
      default: false
    },
    favSummery: {
      type: [Schema.Types.ObjectId],
      ref: "Summery"
    },
    favBook: {
      type: [Schema.Types.ObjectId],
      ref: "Book"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
