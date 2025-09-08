const mongoose = require("mongoose");
const Registration = require("../models/registrationModel");
const Event = require("../models/eventModel");

exports.registerEvent = async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  const regCount = await Registration.countDocuments({ eventId });

  if (regCount >= event.capacity)
    return res.send("Registration full for this event");

  await Registration.create({
    studentId: req.user.username,
    eventId,
  });
  res.redirect("/events");
};

exports.listRegistrations = async (req, res) => {
  const registrations = await Registration.find();
  const events = await Event.find();

  const registrationList = registrations.map((reg) => {
    const matchingEvent = events.find(
      (e) => e._id.toString() === reg.eventId.toString()
    );

    return {
      studentId: reg.studentId,
      registrationDate: reg.registrationDate,
      eventName: matchingEvent?.name || "Unknown",
      eventDate: matchingEvent?.date || "N/A",
      eventLocation: matchingEvent?.location || "N/A",
    };
  });

  res.render("listRegistrations", { registrations: registrationList });
};

exports.unregisterEvent = async (req, res) => {
  const { eventId } = req.params;
  const studentId = req.user.username;

  const deleted = await Registration.findOneAndDelete({ eventId, studentId });

  if (!deleted) {
    return res.send("You are not registered for this event.");
  }

  res.redirect("/events");
};
