const Event = require("../models/eventModel");
const Registration = require("../models/registrationModel");

exports.showEvents = async (req, res) => {
  const events = await Event.find();
  const registrations = await Registration.find({
    studentId: req.user.username,
  });

  const eventList = await Promise.all(
    events.map(async (event) => {
      const count = await Registration.countDocuments({ eventId: event._id });
      const isRegistered = registrations.some(
        (r) => r.eventId.toString() === event._id.toString()
      );

      return {
        ...event.toObject(),
        registeredCount: count,
        isRegistered,
      };
    })
  );

  res.render("registerEvent", { events: eventList });
};
