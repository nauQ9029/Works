const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
var User = require("../models/user");
const jwt = require("jsonwebtoken");

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userController.findByUsername(username);

    if (user) {
      const payload = { sub: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.send("Login unsuccessfully");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    let user = await userController.findByUsername(username);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = userController.create(username, password);

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json("User created successfully", +user._id);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

userRouter.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      res.clearCookie("connect.sid");
      res.send("Logged out successfully");
    });
  });
});

module.exports = userRouter;
