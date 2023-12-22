const mongoose = require("mongoose");

const Playlist = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },

  // A song is array because a playlist contain multiple array
  song: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Song",
    },
  ],
  collaborators: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
});

const PlaylistModel = mongoose.model("playlist", Playlist);

module.exports = PlaylistModel;
