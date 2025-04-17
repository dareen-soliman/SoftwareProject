
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UsersController');
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

//router.use(authenticationMiddleware);


router.get("/profile", userController.getCurrentUser);
router.put("/profile", userController.updateUser);
router.get('/bookings',authorizationMiddleware(["standard"]), userController.getCurrentUserBookings); 
router.get('/events',authorizationMiddleware(["organizer"]), userController.getCurrentUserEvents); 
router.get("/events/analytics", authorizationMiddleware(["organizer"]), userController.getEventAnalytics);



router.get("/",authorizationMiddleware(['admin']), userController.getAllUsers);

router.get("/:id" , authorizationMiddleware(["admin"]), userController.getUserById);
router.put("/:id", authorizationMiddleware(["admin"]), userController.updateUser);
router.delete("/:id", authorizationMiddleware(["admin"]), userController.deleteUser);



module.exports = router;








// const express = require("express");
// const router = express.Router();

// const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// const {
//     getAllUsers,
//     getUserById,
//     deleteUser,
//     updateUser,
//     getCurrentUser
// } = require("../Controllers/UsersController");
// const authenticationMiddleware = require('../Middleware/authenticationMiddleware');


// /////////////////////////////////////////////////////////////
// // missing get user profile method
// router.get("/profile", getCurrentUser);
// router.put("/profile", updateUser);


// router.get('/bookings',authorizationMiddleware(["standard"]), getCurrentUserBookings);
// router.get("/",authorizationMiddleware(['admin']), getAllUsers);

// router.get("/:id" , authorizationMiddleware(["admin"]), getUserById);
// router.put("/:id", authorizationMiddleware(["admin"]), updateUser);
// router.delete("/:id", authorizationMiddleware(["admin"]), deleteUser);


// module.exports = router;

