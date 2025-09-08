const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());

// routes
app.use("/", authRoutes);
app.use("/events", eventRoutes);
app.use("/registrations", registrationRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(8080, () => console.log("Server is running on 8080"));
});
