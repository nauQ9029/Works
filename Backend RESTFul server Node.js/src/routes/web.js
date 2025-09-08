const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getAboutPage,
  getContactPage,
  getDetailPage,
} = require("../controllers/homeController");

// router.Method('/route', handler)
// Default route
router.get("/", getHomePage);

// Custom route
router.get("/about", getAboutPage);
router.get("/contact", getContactPage);
router.get("/detail", getDetailPage);

module.exports = router;
