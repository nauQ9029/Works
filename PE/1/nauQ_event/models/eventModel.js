const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  location: String,
  capacity: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema, "Event");
