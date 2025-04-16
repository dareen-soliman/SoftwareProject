const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/EventsController");

const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// * Create a new event (Organizer only)
router.post("/",authorizationMiddleware(["organizer"]), eventController.createEvent);

// * Get all approved events (Public)
router.get("/", eventController.getAllEvents);

// * Get organizer analytics (Organizer only)
//router.get("/organizer/analytics",authorizationMiddleware(["organizer"]), eventController.getOrganizerAnalytics);


// * Get a specific event by ID (Public)
router.get("/:id", eventController.getEventById);

// * Update an event (Organizer or Admin)
router.put("/:id", authorizationMiddleware(["organizer", "admin"]), eventController.updateEvent);

// * Delete an event (Organizer or Admin)
router.delete("/:id",authorizationMiddleware(["organizer", "admin"]), eventController.deleteEvent);

// * Update event status (Admin only)
router.patch("/:id/status",authorizationMiddleware(["admin"]), eventController.updateStatus);

module.exports = router;
