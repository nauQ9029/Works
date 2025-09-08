const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // remove whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model named 'User'
module.exports = mongoose.model("User", userSchema);
