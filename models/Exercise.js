const mongoose = require("mongoose");

// Exercise Schema
const Exercise = new mongoose.Schema({
  username: String,
  description: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  date: {
    type: String,
    default: () => new Date(Number(Date.now())).toDateString(),
  },
});

module.exports = mongoose.model("Exercise", Exercise);
