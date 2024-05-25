const mongoose = require("mongoose");

// Log Schema
const Log = new mongoose.Schema({
  username: String,
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: {
        type: Date,
        default: () => new Date(Number(Date.now())).toDateString(),
      },
    },
  ],
});

module.exports = mongoose.model("Log", Log);
