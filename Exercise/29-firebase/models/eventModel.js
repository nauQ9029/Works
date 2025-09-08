const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  date: Date,
  location: String,
  description: String,
});
module.exports = mongoose.model("Event", eventSchema, "Event");
