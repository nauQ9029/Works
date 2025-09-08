const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
var User = require("../models/user");

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.get("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ status: "Login successful", user: req.user });
});

userRouter.post("/signup", (req, res, next) => {
  console.log(req.body.username, req.body.password);
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local", { session: true })(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful" });
        });
      }
    }
  );
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
