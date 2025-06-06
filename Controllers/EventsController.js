const Event = require("../Models/Events.js");

const eventController = {
  createEvent: async (req, res) => {
    try {
      if (req.user.role !== "organizer") {
        return res.status(403).json({ message: "Access denied" });
      }

      const {
        title,
        description,
        date,
        location,
        category,
        image,
        ticketPrice,
        totalTickets,
        organizer,
      } = req.body;

      const newEvent = new Event({
        title,
        description,
        date,
        location,
        category,
        image,
        ticketPrice,
        totalTickets,
        remainingTickets: totalTickets,
        organizer: req.user._id || organizer,  // Prefer req.user._id for security
        status: "pending",
      });

      const savedEvent = await newEvent.save();
      res.status(201).json({ message: "Event created", event: savedEvent });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  getAllApprovedEvents: async (req, res) => {
    try {
      const events = await Event.find({ status: "approved" }).populate("organizer", "name");
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },      
  
  getAllEvents: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Only admins can access this resource." });
      }

      const events = await Event.find({ status: { $in: ["approved", "pending", "declined"] } }).populate("organizer", "name");
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }, 

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate("organizer", "name");
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  updateEvent: async (req, res) => {
    console.log("Update payload:", req.body);

  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const isOrganizer = req.user._id === event.organizer.toString();
    const isAdmin = req.user.role === "admin";

    if (req.body.status && !isAdmin) {
      return res.status(403).json({ message: "Only admins can change the status of an event" });
    }

    if (!isOrganizer && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Validate totalTickets update against tickets already booked
    if (
      req.body.totalTickets !== undefined &&
      req.body.totalTickets < event.totalTickets - event.remainingTickets
    ) {
      return res.status(400).json({ message: "Insufficient tickets available for this update" });
    }

    // Build updates object with all possible fields from req.body
    const updates = {};

    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.category !== undefined) updates.category = req.body.category;
    if (req.body.image !== undefined) updates.image = req.body.image;
    if (req.body.date !== undefined) updates.date = req.body.date;
    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.ticketPrice !== undefined) updates.ticketPrice = req.body.ticketPrice;
    if (req.body.totalTickets !== undefined) updates.totalTickets = req.body.totalTickets;
    if (isAdmin && req.body.status !== undefined) updates.status = req.body.status;

    // Update remainingTickets if totalTickets changed
    if (updates.totalTickets !== undefined) {
      updates.remainingTickets = Math.max(
        0,
        updates.totalTickets - (event.totalTickets - event.remainingTickets)
      );
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });

    res.status(200).json({ message: "Event updated", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
,

deleteEvent: async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const isOrganizer = req.user._id === event.organizer.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOrganizer && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
,
};

module.exports = eventController;
