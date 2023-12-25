const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const app = express();
const port = 8080;

const authRoutes = require("./routes/auth");

app.use(
  express.json()
); /*  this will make ensure to express that the response coming to it is in form of json */

/* the connection is done in two steps 
    1. to put the link of database
    2. to put 2 option */
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
opts.secretOrKey = "ThisKeyIsSupposeToBeSecret"; // this is just a keywords which is kept to be secret
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

app.get("/", (req, res) => {
  // req contain all the data for request
  // res contain all the data for response

  res.send("Hello Buddy");
});

app.use("/auth", authRoutes);
/* this will use all the router present in approuter i.e from ./routes/auth folder
which will make the url as localhost:8000/auth/regester */

app.listen(port, () => {
  // running express on port 8000
  console.log("app is running on port " + port);
});
