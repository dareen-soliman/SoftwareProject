const express = require("express");
const router = express.Router();

// const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
// const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

const {
    registerUser,
    loginUser,
    forgetPassword,
    verifyOTP
} = require("../Controllers/UsersController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgetPassword", forgetPassword);
router.post('/verifyOTP', verifyOTP);

 
module.exports = router;