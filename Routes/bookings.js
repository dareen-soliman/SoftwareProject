const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/BookingsController');
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

router.use(authenticationMiddleware);
router.use(authorizationMiddleware(['standard']));

router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.delete('/:id', bookingController.cancelBooking);

const authorize = require('../Middleware/authorizationMiddleware');



router.post('/',authorize(['standard',]), createBooking);
router.get('/',authorize(['standard']), getUserBookings);
router.get('/:id', authorize(['standard']), getBookingById);
router.delete('/:id',authorize(['standard']), cancelBooking);

module.exports = router;
