import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bananaLogo from "../../assets/banana.png"; // Adjust the path
import Preloader from "../preloader/preloader"; // Import the Preloader component
import "./Landing.css";

const Landing = () => {
  const [loading, setLoading] = useState(true); // State to handle preloader visibility
  const navigate = useNavigate(); // Initialize the navigation hook

  // Simulate loading effect for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Preloader duration (3 seconds)

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  const handleNavigate = () => {
    navigate("/register"); // Navigate to the register page
  };

  // Show Preloader while loading is true
  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="landing-container">
      {/* Banana Logo in Top-Left */}
      <div className="banana-logo">
        <img src={bananaLogo} alt="Banana Logo" />
      </div>

      {/* Yellow Circles in Top-Right */}
      <div className="circle-container">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>

      {/* Welcome Text in Bottom-Left */}
      <h1 className="welcome-text">Welcome</h1>

      {/* Next Button in Bottom-Right */}
      <button className="next-button" onClick={handleNavigate}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="arrow-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default Landing;




