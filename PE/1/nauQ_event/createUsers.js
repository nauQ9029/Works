const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");

async function createUsers() {
  await mongoose.connect("mongodb://localhost:27017/EventManagement-TPE1");

  const hashedStudentPassword = await bcrypt.hash("student123", 10);
  const hashedAdminPassword = await bcrypt.hash("admin123", 10);

  const users = [
    {
      username: "student01",
      password: hashedStudentPassword,
      role: "student",
    },
    {
      username: "admin01",
      password: hashedAdminPassword,
      role: "admin",
    },
  ];

  try {
    await User.deleteMany({ username: { $in: ["student01", "admin01"] } }); // optional: clean old users
    await User.insertMany(users);
    console.log("Users created successfully");
  } catch (err) {
    console.error("Error creating users:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

createUsers();
