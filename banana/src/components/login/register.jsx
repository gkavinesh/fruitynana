import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bananaLogo from "../../assets/banana.png";
import googleLogo from "../../assets/google.png";
import Preloader from "../preloader/preloader"; // Import Preloader
import "./register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });
      toast.success("Registration successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/login"); // Redirect to the new page (e.g., "/welcome")
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleGoogleRegister = () => {
    // Redirect to backend for Google OAuth registration
    window.location.href = "http://localhost:5000/auth/google";
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="register-container">
      <ToastContainer /> {/* Toast Container for notifications */}
      <div className="register-card">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="logo-container-2">
            <img src={bananaLogo} alt="Banana Logo" className="banana-logo-2" />
            <h1 className="app-title">fruitynana</h1>
          </div>

          <div className="name-fields">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="input-field"
            />
          </div>

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

          <button type="submit" className="register-button">
            Sign Up
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Google OAuth Button */}
        <div className="name-fields">
          <button className="google-button" onClick={handleGoogleRegister}>
            <img src={googleLogo} alt="Google Logo" className="google-logo" />
            Sign Up with Google
          </button>
        </div>

        <p className="signin-link">
          Sign In? <a href="/login">Click here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;





