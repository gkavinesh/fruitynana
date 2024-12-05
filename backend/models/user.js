const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true, // To uniquely identify users who register via Google
    sparse: true, // Makes googleId optional for normal users
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  score: {
    type: Number, // Changed from array to a single number to store the most recent score
    default: 0, // Default to 0 if no score exists
  },
  highestScore: {
    type: Number, // Track the highest score separately
    default: 0,
  },
});

// Encrypt password before saving if password field is being used (normal login)
userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);



