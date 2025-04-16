const express = require("express");
const router = express.Router();

// const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
// const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

const {
    registerUser,
    loginUser,
    forgetPassword
} = require("../Controllers/UsersController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgetPassword", forgetPassword);


module.exports = router;