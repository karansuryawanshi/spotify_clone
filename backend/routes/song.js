// compiled with error
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

// create song
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // try {
    // we can keep sesson:false; because we dont what to store session
    // password.authenticate("jwt") is use to authenticate by using jwt means the name of password authenticate statergy is defaultly set as jwt given in index.js
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "insufficient details to create songs" });
    }
    const artist = req.user._id;
    // the req.user._id identifies the id of the user accordingly the user is idntified
    const songDetail = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetail);
    return res.status(200).json(createdSong);
    // }
    // catch (error) {
    //   console.log("error is here ===================>");
    // }
  }
);

// get song
// router.get(
//   "/get/mysong",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     // We need to get all songs where artist id == currentUser._id
//     const songs = await Song.find({ artist: req.user._id }).populate("artist");
//     return res.status(200).json({ data: songs });
//   }
// );

router.get(
  "/get/mysong",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // We need to get all songs where artist id == currentUser._id
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

// get the song publish by any artistID
router.get(
  "/get/artist/:artistid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistid } = req.params;
    // taking artistid as in an input it means that
    const artist = await User.findOne({ _id: artistid });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songs = await Song.find({ artist: artistid });
    return res.status(200).json({ data: songs });
  }
);

// get the song by song name
router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;
    // taking songName as input to search song
    const songs = await Song.find({ name: songName });
    return res.status(200).json({ data: songs });
  }
);

module.exports = router;
