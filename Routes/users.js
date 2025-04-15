const express = require("express");
const router = express.Router();

const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

const { getUsers, getUserById, updateUserRole, deleteUser, getUserProfile, updateUserProfile ,registerUser, loginUser , forgetPassword       } = require("../Controllers/UsersController");




router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgetPassword", forgetPassword);


router.get("/", authenticationMiddleware , authorizationMiddleware["admin"] , getAllUsers); // Admin-only route
router.get("/profile", authenticationMiddleware, getUserProfile); // Authenticated users
router.put("/profile", authenticationMiddleware, updateUserProfile);// Authenticated users 
router.get("/:id", authenticationMiddleware, authorizationMiddleware["admin"], getUserById); // Admin-only route
router.put("/:id", authenticationMiddleware, authorizationMiddleware["admin"], updateUserRole); // Admin-only route
router.delete("/:id", authenticationMiddleware, authorizationMiddleware["admin"], deleteUser); // Admin-only route



module.exports = router;
