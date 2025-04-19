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

<<<<<<< HEAD
const authorize = require('../Middleware/authorizationMiddleware');



router.post('/',authorize(['standard',]), createBooking);
router.get('/',authorize(['standard']), getUserBookings);
router.get('/:id', authorize(['standard']), getBookingById);
router.delete('/:id',authorize(['standard']), cancelBooking);

module.exports = router;
=======
module.exports = router;
>>>>>>> 1c312f2565c803bd53cbc71b71044e3c802ea917
