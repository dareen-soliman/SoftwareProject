const Booking = require('../Models/Bookings');
const Event = require('../Models/Events');

exports.createBooking = async (req, res) => {
  if (req.user.role !== 'standard') return res.status(403).json({ message: 'Only standard users allowed' });

  const userId = req.user._id;
  const { eventId, ticketsBooked } = req.body;
 console.log(req.body);
  if (!eventId || !ticketsBooked || ticketsBooked < 1) {
    return res.status(400).json({ message: 'Event ID and valid quantity required' });
  }

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.remainingTickets < ticketsBooked) {
    return res.status(400).json({ message: 'Not enough tickets available' });
  }

  const totalPrice = event.ticketPrice * ticketsBooked;
  event.remainingTickets -= ticketsBooked;
  await event.save();

  const booking = await Booking.create({
    user: userId,
    event: eventId,
    ticketsBooked,
    totalPrice,
  });

  res.status(201).json({ message: 'Booking successful', booking });
};

exports.getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('event');
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.user.toString() !== req.user._id) {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json(booking);
};

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
  }};
