const express = require("express");
const router = express.Router();
const { getUsers, getUserById, updateUserRole, deleteUser, getUserProfile, updateUserProfile ,register, login , forgetPassword } = require("../controllers/userController");


const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/forgetPassword", forgetPassword);


router.get("/", protect, isAdmin, getUsers); // Admin-only route
router.get("/profile", protect, getUserProfile); // Authenticated users
router.put("/profile", protect, updateUserProfile);// Authenticated users 
router.get("/:id", protect, isAdmin, getUserById); // Admin-only route
router.put("/:id", protect, isAdmin, updateUserRole); // Admin-only route
router.delete("/:id", protect, isAdmin, deleteUser); // Admin-only route



module.exports = router;
