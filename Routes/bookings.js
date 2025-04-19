const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/BookingsController');
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

router.use(authenticationMiddleware);
router.use(authorizationMiddleware(['standard']));

router.post('/', bookingController.createBooking);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.delete('/:id', bookingController.cancelBooking);







module.exports = router;
