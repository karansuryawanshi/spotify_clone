const express = require("express");
const router = express.Router();
const passport = require("passport");
const { route } = require("./auth");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");
const { clear } = require("console");

// create playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, song } = req.body;
    if (!name || !thumbnail || !song) {
      return res.status(301).json({ err: "Insufficient Data" });
    }

    const playlistData = {
      name,
      thumbnail,
      song,
      owner: currentUser._id,
      collaborators: [],
    };

    const playlist = await Playlist.create(playlistData);
    return res.status(301).json(playlist);
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid ID" });
    }
    return res.status(200).json(playlist);
  }
);

// get all playlist made by artist

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;

    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "invalid artist ID" });
    }
    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
  }
);

// add the song to playlist

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;
    // Step 1 :- Get the playlist if valid
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(301).json({ err: "Playlist Does not exist" });
    }

    // Step 2 :- check if the currentuser owns the playlist or the colabolator
    if (
      !playlist.owner.equals(currentUser._id) &&
      /* playlist.owner != currentUser._id && (as it is same as above but we cannot use this because 
        two object cannot cannot compare to each other in javascript so using "equals" in above statement 
        means that it compare the value present on that particular address and by using "!=" or "==" it 
        compare the address which are different threrfore it would be always different) */
      !playlist.collaborators.includes(currentUser._id)
    ) {
      return res.status(400).json({ err: "Not allowed" });
    }

    // Step 3 :- check of the song is valid
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(304).json({ err: "Not Allowed" });
    }
    // step 4 :- push the song in playlist
    playlist.song.push(songId);
    await playlist.save();

    return res.status(200).json({ playlist });
  }
);

module.exports = router;
