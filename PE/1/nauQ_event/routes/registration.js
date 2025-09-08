const express = require("express");
const Registration = require("../models/registrationModel");
const Event = require("../models/eventModel");
const auth = require("../middleware/auth");
const router = express.Router();

// 3.2 Student Event Registration API
router.post("/", auth("student"), async (req, res) => {
  const studentId = req.user.id; // from JWT payload
  const { eventId } = req.body;

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const registrations = await Registration.find({ eventId });
  if (registrations.length >= event.capacity) {
    return res.status(400).json({ message: "Event is full" });
  }

  const newReg = await Registration.create({ studentId, eventId });
  res
    .status(201)
    .json({ message: "Registered successfully", registration: newReg });
});

// 3.3 Student Event Unregistration API
router.delete("/:id", auth("student"), async (req, res) => {
  const result = await Registration.findByIdAndDelete(req.params.id);
  if (!result) {
    return res.status(401).json({ message: "Registration not found" });
  }
  res.json({ message: "Registration cancelled sucessfully" });
});

// 3.4 Admin View Registered Event List API
router.get("/listRegistrations", auth("admin"), async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("studentId", "username")
      .populate("eventId", "name date");

    if (registrations.length === 0) {
      return res.status(200).json({ message: "No registrations found" });
    }

    res.status(200).json({ registrations });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// 3.5 Admin Search Registrations by Date API
router.get("/getRegistrationsByDate", auth("admin"), async (req, res) => {
  const { start, end } = req.query;
  if (new Date(start) >= new Date(end))   // validate date range (if end is larger or equal to start -> fail)
    return res.status(400).json({ message: "Invalid date range" });

  const regs = await Registration.find({  // find registrations within the date range
    registrationDate: { $gte: new Date(start), $lte: new Date(end) },
  });
  res.json(regs);
});

module.exports = router;
