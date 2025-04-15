const express = require("express");
const router = express.Router();

const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

const {
    getAllUsers,
    getUserById,
    deleteUser,
    getUserProfile,
    updateUser,
    registerUser,
    loginUser,
    forgetPassword
} = require("../Controllers/UsersController");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgetPassword", forgetPassword);

// Authenticated user routes
//router.get("/profile", authenticationMiddleware, getUserProfile);
router.put("/profile", updateUser);


//router.get("/", authenticationMiddleware, authorizationMiddleware(['admin']), getAllUsers);
router.get("/:id", authenticationMiddleware, authorizationMiddleware(["admin"]), getUserById);
router.put("/:id", authenticationMiddleware, authorizationMiddleware(["admin"]), updateUser);
router.delete("/:id", authenticationMiddleware, authorizationMiddleware(["admin"]), deleteUser);

module.exports = router;
