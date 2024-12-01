import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bananaLogo from "../../assets/banana.png";
import googleLogo from "../../assets/google.png";
import Preloader from "../preloader/preloader";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to the dashboard or desired page
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return <Preloader />;
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

        <button className="google-button">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
          Sign In with Google
        </button>

        <p className="signup-link">
          Sign Up? <a href="/register">Click here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;


