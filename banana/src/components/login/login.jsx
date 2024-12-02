import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bananaLogo from "../../assets/banana.png";
import googleLogo from "../../assets/google.png";
import Preloader from "../preloader/preloader"; // Import Preloader
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // Loading state to show preloader
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show preloader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle normal login (email/password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Normal login
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Save token and userName from response
      setToken(data.token); // Save JWT token for authentication
      setUserName(data.user.name); // Set user's name for session

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard"); // Redirect to the dashboard after login
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Handle Google OAuth login (redirect to backend for authentication)
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Redirect to backend Google login route
  };

  if (loading) {
    return <Preloader />; // Show preloader while loading
  }

  return (
    <div className="login-container">
      <ToastContainer /> {/* Toastify Container for notifications */}
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="logo-container-3">
            <img src={bananaLogo} alt="Banana Logo" className="banana-logo-2" />
            <h1 className="app-title">fruitynana</h1>
          </div>

          {/* Email and Password Fields */}
          <div className="name-fields">
            <input
              type="email"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="name-fields">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Google OAuth Button */}
        <div className="name-fields">
          <button className="google-button" onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google Logo" className="google-logo" />
            Sign In with Google
          </button>
        </div>

        <p className="signup-link">
          Sign Up? <a href="/register">Click here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;




