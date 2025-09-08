const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(" >>> [DEBUG] MongoDB connected successfully");
    console.log(" >>> [DEBUG] Database name: ", mongoose.connection.db.databaseName)
  } catch (err) {
    console.log(" >>> [DEBUG] MongoDB connected failed");
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
