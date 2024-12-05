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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send login request with email and password
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email,    // Can be either email or username (depending on your backend)
        password,
      });
  
      // Save JWT token and user name from the response
      setToken(data.token);  // Store the JWT token in state or localStorage
      setUserName(data.name); // Store the username in state
  
      // Display success message
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
  
      // Redirect to the dashboard after 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      // Handle error case (401 Unauthorized)
      const errorMessage = error.response?.data?.message || "Login failed!";
      toast.error(errorMessage, {
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

          <button type="submit" className="login-button" onClick={handleSubmit}>
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




