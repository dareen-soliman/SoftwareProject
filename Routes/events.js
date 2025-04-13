const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/EventsController");
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');


// * Create a new event (Organizer only)
router.post("/", authenticationMiddleware, authorizationMiddleware(["organizer"]), eventController.createEvent);

// * Get all approved events (Public)
router.get("/", eventController.getAllEvents);

// * Get a specific event by ID (Public)
router.get("/:id", eventController.getEventById);

// * Update an event (Organizer or Admin)
router.put("/:id", authenticationMiddleware, authorizationMiddleware(["organizer", "admin"]), eventController.updateEvent);

// * Delete an event (Organizer or Admin)
router.delete("/:id", authenticationMiddleware, authorizationMiddleware(["organizer", "admin"]), eventController.deleteEvent);

// * Update event status (Admin only)
router.patch("/:id/status", authenticationMiddleware, authorizationMiddleware(["admin"]), eventController.updateStatus);

// * Get organizer analytics (Organizer only)
router.get("/organizer/analytics", authenticationMiddleware, authorizationMiddleware(["organizer"]), eventController.getOrganizerAnalytics);

module.exports = router;
