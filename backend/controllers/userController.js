const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  // If you're using JWT for authentication

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User (Normal Registration)
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User (Normal Login)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Store user data in session
      req.session.userId = user.id;
      req.session.userName = user.name;  // Store user name in session

      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id), // Send token for frontend usage
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Google OAuth Login
exports.googleLogin = async (req, res) => {
  const { googleId, name, email } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // If no user, create a new one
      user = new User({
        googleId,
        name,
        email,
      });
      await user.save();
    }

    // Save user session
    req.session.userId = user.id;
    req.session.userName = user.name;

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id), // Send token for frontend usage
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during Google login" });
  }
};

// Logout User
exports.logoutUser = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Current Session
exports.getCurrentSession = (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ name: req.session.userName });
  } else {
    res.status(401).json({ message: "No active session" });
  }
};

exports.saveScore = async (req, res) => {
  const { email, score } = req.body; // Extract email and score from the request body

  if (!email || score === undefined) {
    return res.status(400).json({ success: false, message: "Email and score are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Add the score to the scores array
    user.scores.push(score);

    // Update the highestScore if the new score is greater
    if (!user.highestScore || score > user.highestScore) {
      user.highestScore = score;
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: "Score saved successfully!",
      scores: user.scores,
      highestScore: user.highestScore,
    });
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};








