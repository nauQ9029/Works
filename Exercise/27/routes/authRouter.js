const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.get("/facebook", passport.authenticate("facebook", { session: false }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        _id: req.user._id,
        facebookId: req.user.facebookId,
        username: req.user.username,
      },
      process.env.JWT_SECRET || "12345",
      { expiresIn: "1h" }
    );

    res.json({ token });
  }
);

module.exports = router;
