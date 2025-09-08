const mongoose = require("mongoose");
require("dotenv").config();

// You can move this URI to environment variables for better security
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/testConnection";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" >>> [DEBUG] MongoDB connected successfully");
  } catch (error) {
    console.error(">>> [DEBUG] MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;