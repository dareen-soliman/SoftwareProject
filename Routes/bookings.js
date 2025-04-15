const express = require('express');
const router = express.Router();

const {
  createBooking,
  getBookingById,
  getUserBookings,
  cancelBooking
} = require('../Controllers/BookingsController');


const authorize = require('../Middleware/authorizationMiddleware');



router.post('/',authorize(['standard',]), createBooking);
router.get('/',authorize(['standard']), getUserBookings);
router.get('/:id', authorize(['standard']), getBookingById);
router.delete('/:id',authorize(['standard']), cancelBooking);

module.exports = router;
