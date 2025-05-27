const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/EventsController");

const authorizationMiddleware = require('../Middleware/authorizationMiddleware');
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');


router.post("/",authorizationMiddleware(["organizer"]), eventController.createEvent);
router.get("/", eventController.getAllApprovedEvents);
router.get("/all", authorizationMiddleware(["admin"]) ,eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", authenticationMiddleware,  authorizationMiddleware(["organizer", "admin"]), eventController.updateEvent);
router.delete("/:id",authenticationMiddleware,authorizationMiddleware(["organizer", "admin"]), eventController.deleteEvent);


module.exports = router;
