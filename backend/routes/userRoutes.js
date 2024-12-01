const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentSession,
} = require("../controllers/userController");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Logout Route
router.post("/logout", logoutUser);

// Get Current Session Route
router.get("/session", getCurrentSession);

module.exports = router;


