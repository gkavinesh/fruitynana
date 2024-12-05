// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentSession,
  googleLogin,
  saveScore,
  getAllScores, // Import the new method
} = require("../controllers/userController");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Google OAuth Login Route
router.post("/google-login", googleLogin);

// Logout Route
router.post("/logout", logoutUser);

// Get Current Session Route
router.get("/session", getCurrentSession);

// Save Score Route
router.post("/score", saveScore);

// Get All User Scores Route
router.get("/all-scores", getAllScores);

module.exports = router;




