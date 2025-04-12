const Event = require("../Models/Events.js");

const eventController = {
  // POST /api/v1/events - Organizer only
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
        organizer: req.user.userId,
        status: "pending",
      });

      const savedEvent = await newEvent.save();
      res.status(201).json({ message: "Event created", event: savedEvent });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // GET /api/v1/events/:id - Public
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

  // PUT /api/v1/events/:id - Organizer or Admin
  updateEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      const isOrganizer = req.user.userId === event.organizer.toString();
      const isAdmin = req.user.role === "admin";

      if (!isOrganizer && !isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      const { date, location, totalTickets, ticketPrice } = req.body;

      // Check if there's a decrease in total tickets
      if (totalTickets < event.totalTickets - event.remainingTickets) {
        return res.status(400).json({ message: "Insufficient tickets available for this update" });
      }

      const updates = { date, location, totalTickets, ticketPrice };
      if (updates.totalTickets !== undefined) {
        updates.remainingTickets = Math.max(0, updates.totalTickets - (event.totalTickets - event.remainingTickets));
      }

      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });
      res.status(200).json({ message: "Event updated", event: updatedEvent });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // DELETE /api/v1/events/:id - Organizer or Admin
  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      const isOrganizer = req.user.userId === event.organizer.toString();
      const isAdmin = req.user.role === "admin";

      if (!isOrganizer && !isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // PATCH /api/v1/events/:id/status - Admin only
  updateStatus: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admins can approve/reject events" });
      }

      const { status } = req.body;
      if (!["approved", "declined"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const event = await Event.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!event) return res.status(404).json({ message: "Event not found" });

      res.status(200).json({ message: `Event ${status}`, event });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // GET /api/v1/events/organizer/analytics - Organizer only
  getOrganizerAnalytics: async (req, res) => {
    try {
      if (req.user.role !== "organizer") {
        return res.status(403).json({ message: "Access denied" });
      }

      const events = await Event.find({ organizer: req.user.userId });

      const analytics = events.map((event) => {
        const booked = event.totalTickets - event.remainingTickets;
        const percentageBooked = ((booked / event.totalTickets) * 100).toFixed(2);

        return {
          title: event.title,
          percentageBooked,
        };
      });

      res.status(200).json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },
};

module.exports = eventController;
