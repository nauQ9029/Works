const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const auth = require("../middleware/auth");

router.get("/", auth("admin"), registrationController.listRegistrations);

module.exports = router;
