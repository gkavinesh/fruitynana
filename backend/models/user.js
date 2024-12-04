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
  scores: {
    type: [Number], // Array to store multiple scores
    default: [], // Default to an empty array
  },
  highestScore: {
    type: Number, // Optional: Track the highest score separately
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


