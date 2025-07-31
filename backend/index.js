const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");

const app = express();
const port = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");

const cors = require("cors");

app.use(cors());
app.use(
  express.json()
); /*  this will make ensure to express that the response coming to it is in form of json */
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/spotify?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1",
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
