const express = require("express");
const router = express.Router();
const { getUsers, getUserById, updateUserRole, deleteUser, getUserProfile, updateUserProfile ,registerUser, loginUser , forgetPassword       } = require("../Controllers/UsersController");


/* const { protect, isAdmin } = require("../Middleware/authMiddleware"); */

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgetPassword", forgetPassword);


router.get("/", protect, isAdmin, getAllUsers); // Admin-only route
router.get("/profile", protect, getUserProfile); // Authenticated users
router.put("/profile", protect, updateUserProfile);// Authenticated users 
router.get("/:id", protect, isAdmin, getUserById); // Admin-only route
router.put("/:id", protect, isAdmin, updateUserRole); // Admin-only route
router.delete("/:id", protect, isAdmin, deleteUser); // Admin-only route



module.exports = router;
