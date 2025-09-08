// app.js
const express = require("express");
const app = express();
const passport = require("passport");
const morgan = require("morgan");

// Load passport config
require("./config/passportFacebook");
require("dotenv").config();

// Mount routers
const authRouter = require("./routes/authRouter");
const articleRouter = require("./routes/articleRouter");

app.use(morgan("dev"));
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/articles", articleRouter);

module.exports = app;
