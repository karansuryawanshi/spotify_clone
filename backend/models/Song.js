const mongoose = require("mongoose");

const Song = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  thumbnail: {
    type: string,
    require: true,
  },

  track: {
    type: string,
    require: true,
  },

  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "user", // name of database
  },
});

const SongModel = mongoose.model("song", Song);

module.exports = SongModel;
