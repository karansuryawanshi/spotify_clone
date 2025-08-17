import express from "express";
import mongoose from "mongoose";

// const JwtStrategy = require("passport-jwt").Strategy,
// ExtractJwt = require("passport-jwt").ExtractJwt;
// const passport = require("passport");
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "./models/User.js";

// const User = require("./models/User");

const app = express();
const port = process.env.PORT || 8080;

import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/song.js";
import playlistRoutes from "./routes/playlist.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// const cors = require("cors");

app.use(cors());
app.use(
  express.json()
); /*  this will make ensure to express that the response coming to it is in form of json */
mongoose
  .connect(
    "MONGO_URI=mongodb+srv://karansuryawanshi:Test1234@cluster0.powpyib.mongodb.net/spotifyclone?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.log("error While connecting to mongo!");
  });
// ".then" is when above code is executed successfully (ezsnippet chain wali video thappad)

// Passport-jwt setup from website
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ThisKeyIsSupposeToBeSecret";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // By default the name of the name of statergy is jwt
    // It can be set by using as eg:- "user" after passport.use("user" ..code)
    const user = await User.findOne({ _id: jwt_payload.identifier });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

app.get("/", (req, res) => {
  // req contain all the data for request
  // res contain all the data for response

  res.send("Hello Buddy");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
/* this will use all the router present in approuter i.e from ./routes/auth folder
which will make the url as localhost:8000/auth/regester */

app.listen(port, () => {
  // running express on port 8000
  console.log("app is running on port " + port);
});
