const express = require('express');
const router = express.Router();

const {
  createBooking,
  getBookingById,
  getUserBookings,
  cancelBooking
} = require('../Controllers/BookingsController');

const authenticate = require('../Middleware/authenticationMiddleware');
const authorize = require('../Middleware/authorizationMiddleware');

router.use(authenticate); 

router.post('/', authorize(['standard']), createBooking);
router.get('/', authorize(['standard']), getUserBookings);
router.get('/:id', authorize(['standard']), getBookingById);
router.delete('/:id', authorize(['standard']), cancelBooking);

module.exports = router;
