const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const registrationController = require("../controllers/registrationController");
const auth = require("../middleware/auth");

router.get("/", auth("student"), eventController.showEvents);
router.post(
  "/register/:eventId",
  auth("student"),
  registrationController.registerEvent
);
router.post(
  "/unregister/:eventId",
  auth("student"),
  registrationController.unregisterEvent
);

module.exports = router;
