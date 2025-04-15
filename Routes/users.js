const express = require("express");
const router = express.Router();

const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

const {
    getAllUsers,
    getUserById,
    deleteUser,
    getUserProfile,
    updateUser,
    registerUser,
    loginUser,
    forgetPassword,
    getCurrentUser
} = require("../Controllers/UsersController");


// Authenticated user routes


///////////////////////////////////////////////////////////////
// missing get user profile method
router.get("/profile", getCurrentUser);
router.put("/profile", updateUser);


router.get("/",authorizationMiddleware(['admin']), getAllUsers);
router.get("/:id" , authorizationMiddleware(["admin"]), getUserById);
router.put("/:id", authorizationMiddleware(["admin"]), updateUser);
router.delete("/:id", authorizationMiddleware(["admin"]), deleteUser);

module.exports = router;
