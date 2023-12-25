const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

router.post("/register", async (req, res) => {
  // Step 1 : Store the Credential in req.body

  const { email, password, firstname, lastname, username } = req.body;

  // Step 2 : Does a Email with the user already exist ? if yes, We throw error

  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403) // Status by Default it shows 200 And we can send status according to us
      .json({ error: "A user with this mail id already Exist" });
  }

  // if the user does not exisit then add new user
  // Step 3 : Create a new user in DB

  /* Step 3.1 : we do not share a password in plain text Hash it */
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  const newUserData = {
    email,
    password: hashPassword,
    firstname,
    lastname,
    username,
  };

  const newUser = await User.create(newUserData);
  console.log(newUser);

  // Step 4 : Create a token to return the user
  /* The reason of creating token is to just identify the user with the unique id instread of
  His personal data. this is for security purpose */

  const token = await getToken(newUser);
  // Step 5 : Return the result to result to the user

  const userToReturn = {
    ...newUser.toJSON(),
    token,
  }; /* this will add a new user to json with token */

  delete userToReturn.password;
  /* this will delete the password it will not return password to user in hash form which 
  is also a securith measure */
  return res.status(200).json(userToReturn);
  // This will return all the users
});

router.post("/login", async (req, res) => {
  // Step 1:- taking email and password from user
  const { email, password } = req.body;
  // Step 2:- comparing email does it already exist. if not the "invalid credential"

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid Credential" });
  }

  // Step 3:- comparing password. it will be compared the hashedpassword stored in database and hash tee password given while logging in
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid Credential" });
  }
  // Step 4:- returning token
  const token = await getToken(user.email, user);
  const userToReturn = {
    ...user.toJSON(),
    token,
  };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
