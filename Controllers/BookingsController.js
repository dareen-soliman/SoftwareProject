const Booking = require('../Models/Bookings');
const Event = require('../Models/Events');

// Book tickets for an event
exports.createBooking = async (req, res) => {
  try {
    const { eventId, ticketsBooked } = req.body;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (ticketsBooked > event.remainingTickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const totalPrice = ticketsBooked * event.ticketPrice;

    const booking = await Booking.create({
      user: userId,
      event: eventId,
      ticketsBooked,
      totalPrice,
      status: "Confirmed"
    });

    event.remainingTickets -= ticketsBooked;
    await event.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('event');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const event = await Event.findById(booking.event);
    if (event) {
      event.remainingTickets += booking.ticketsBooked;
      await event.save();
    }

    booking.status = "Canceled";
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
