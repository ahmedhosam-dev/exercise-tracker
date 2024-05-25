const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Connect to database
try {
  mongoose.connect(process.env.DB_URL);
} catch (e) {
  console.log(e);
}

// Models
const User = require("./models/User");
const Exercise = require("./models/Exercise");
const Log = require("./models/Log");

//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// API //

app.get("/api/hello", (req, res) => {
  res.status(200).json({ hi: "Hello, world!" });
});

// User api
app.get("/api/users", async (req, res) => {
  let allUsers = await User.find({});
  console.log(allUsers);
  res.status(200).json(allUsers);
});

app.post("/api/users", (req, res) => {
  const newUser = new User({
    username: req.body.username,
  });

  newUser.save();

  res.status(200).json({
    _id: newUser._id,
    username: newUser.username,
  });
});

// Listener
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
