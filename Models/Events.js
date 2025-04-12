const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    status: { type: String, enum: ["pending", "approved", "declined"], default: "pending" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String }, // Store image URL or file path
    ticketPrice: { type: Number, required: true, min: 0 }, // Ticket price must be non-negative
    totalTickets: { type: Number, required: true, min: 1 }, // Minimum 1 ticket
    remainingTickets: { type: Number, required: true, min: 0 }, // Store remaining tickets as an attribute
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Connects to User model
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
