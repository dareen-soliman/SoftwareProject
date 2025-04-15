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

router.post('/',authenticate, authorize(['standard']), createBooking);
router.get('/',authenticate, authorize(['standard']), getUserBookings);
router.get('/:id',authenticate, authorize(['standard']), getBookingById);
router.delete('/:id', authenticate,authorize(['standard']), cancelBooking);

module.exports = router;
