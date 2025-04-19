const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/EventsController");

const authorizationMiddleware = require('../Middleware/authorizationMiddleware');


router.post("/",authorizationMiddleware(["organizer"]), eventController.createEvent);
router.get("/", eventController.getAllApprovedEvents);
router.get("/all", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", authorizationMiddleware(["organizer", "admin"]), eventController.updateEvent);
router.delete("/:id",authorizationMiddleware(["organizer", "admin"]), eventController.deleteEvent);
router.patch("/:id/status",authorizationMiddleware(["admin"]), eventController.updateStatus);

module.exports = router;
