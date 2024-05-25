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

// Exercises
app.post("/api/users/:_id/exercises", async (req, res) => {
  const userName = await User.findById(req.params._id);
  let userDate = req.body.date;

  if (req.body.date) {
    let date = req.body.date.split("-");
    userDate = new Date(date[0], date[1] - 1, date[2]).toDateString();
  }

  const newExercies = new Exercise({
    _id: req.params._id,
    username: userName.username,
    description: req.body.description,
    duration: req.body.duration,
    date: userDate,
  });

  // newExercies.save();

  if ((await Log.findById(req.params._id)) === null) {
    const newLog = new Log({
      _id: req.params._id,
      username: userName.username,
      count: 1,
      log: [
        {
          description: req.body.description,
          duration: req.body.duration,
          date: userDate,
        },
      ],
    });

    newLog.save();
  }

  const log = await Log.findById(req.params._id);
  log.count += 1;
  log.log.push({
    description: req.body.description,
    duration: req.body.duration,
    date: userDate,
  });

  log.save();

  res.json(newExercies);
});

// Log
app.get("/api/users/:_id/logs", async (req, res) => {
  if ((await Log.findById(req.params._id)) === null)
    return res.status(500).json({ error_message: "User not found!" });

  const log = await Log.findById(req.params._id);
  res.status(200).json(log);
});

// Listener
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
