const express = require("express");
const router = express.Router();

// Home page route
router.get("/", (req, res) => {
  res.render("index", {
    title: "Question Bank Management System",
    layout: false, // Use EJS for home page
  });
});

module.exports = router;
