require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db.js"); // Adjust the path based on your file structure
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const User = require("./models/user.js"); // Assuming you have a User model
const userController = require("./controllers/userController");


const app = express();

// Connect to the database
connectDB(); // Calling the connectDB function to connect to MongoDB

// Middleware for parsing JSON
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

// Passport Configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }

        // Return the user info to be stored in the session
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Session configuration
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Middleware for session
app.use(
  session({
    secret: "secret", // It's better to store this in the .env file
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect("http://localhost:5173/dashboard");
  }
);

// Session Route
app.get("/api/users/session", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ name: req.user.name });
  } else {
    res.status(401).json({ message: "No active session" });
  }
});

// User Routes
app.use("/api/users", userRoutes);
app.use("/api/game", gameRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





