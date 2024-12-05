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
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If user exists and password is correct, create session and send response
    req.session.userId = user.id;
    req.session.userName = user.name;

    // Generate token for the user and send response to frontend
    const token = generateToken(user.id); // Assuming you have a function for generating token

    return res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token, // Send JWT token to frontend
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
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
    // Assuming the user's name and email are stored in the session
    res.status(200).json({
      name: req.session.userName,
      email: req.session.userEmail,  // Return the email along with the name
    });
  } else {
    res.status(401).json({ message: "No active session" });
  }
};


exports.saveScore = async (req, res) => {
  const { name, score } = req.body; // Extract name and score from the request body

  if (!name || score === undefined) {
    return res.status(400).json({ success: false, message: "Name and score are required" });
  }

  try {
    // Find the user by name (or email if that's your choice)
    const user = await User.findOne({ name }); // Or you could use email here instead of name

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update the score with the latest score
    user.score = score;

    // Update the highestScore if the new score is greater
    if (score > user.highestScore) {
      user.highestScore = score;
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: "Score saved successfully!",
      score: user.score, // Return the updated score
      highestScore: user.highestScore, // Return the updated highestScore
    });
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// Fetch all user scores
exports.getAllScores = async (req, res) => {
  try {
    // Fetch all users sorted by their score (highest first)
    const allScores = await User.find().sort({ score: -1 }); // No limit, so it fetches all users

    // Return all user scores as a response
    res.status(200).json(allScores);
  } catch (error) {
    console.error("Error fetching all user scores:", error);
    res.status(500).json({ message: "Error fetching user scores", error });
  }
};









