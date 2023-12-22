// Step:1 :- Require Mongoose
const mongoose = require("mongoose");

// Step:2 :- creating mongoose Schema
const User = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  likedSong: {
    // will Update accordingly
    type: String,
    default: "",
  },
  likedPlaylist: {
    type: String,
    default: "",
  },
  subscribedArtist: {
    type: String,
    default: "",
  },
});

// Step:3 :- Creating model

const UserModel = mongoose.model("user", User);

module.exports = UserModel;
