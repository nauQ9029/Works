require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const regRoutes = require("./routes/registration");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/EventManagement-TPE1")
  .then(() => console.log("MongoDB connected"));

app.use("/auth", authRoutes);
app.use("/registrations", regRoutes);

app.listen(8080, () => console.log("Server running on port 8080"));
