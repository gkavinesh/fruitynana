import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import { FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./type.css";
import axios from "axios"; // For making API requests
import Preloader from "../preloader/preloader"; // Import Preloader component

const Type = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [loading, setLoading] = useState(true); // To show the loading state
  const navigate = useNavigate(); // Initialize navigate for routing

  // Logout User function
  const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        // Redirect to login page after successful logout
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Fetch session data on component mount
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/session", {
          withCredentials: true, // Ensure the session cookie is included
        });

        // Successfully got session data
        setUserName(response.data.name); // Set the user's name
        console.log("Session ID: ", response.data.sessionId); // Log the session ID (if returned by the backend)

        setLoading(false); // Set loading to false after the data is fetched
      } catch (err) {
        console.error("Error fetching session data:", err);
        setLoading(false); // Set loading to false even if there's an error
        navigate("/login"); // Redirect to login page if no session is found
      }
    };

    setTimeout(() => {
      fetchSessionData(); // Fetch session data after a 3-second delay
    }, 3000); // Simulate the loading time by delaying the fetch
  }, [navigate]);

  // If still loading, show the Preloader
  if (loading) {
    return <Preloader />;
  }

  // Function to handle button clicks and redirect to the difficulty page
  const handleModeSelection = (mode) => {
    navigate("/difficulty", { state: { mode } }); // Passing mode as state
  };

  return (
    <div className="type-container">
      <div className="type-header">
        <div className="logo-container">
          <img src={bananaLogo} alt="Fruitynana Logo" className="logo" />
          <h1 className="app-title">fruitynana</h1>
        </div>
        <div className="icons-container">
          <button className="icon-button">
            <FaUserAlt size={24} />
          </button>
          <button className="icon-button" onClick={logoutUser}>
            <FaSignOutAlt size={24} />
          </button>
        </div>
      </div>

      <div className="type-content">
        <h2 className="prompt-text">Select Player Mode</h2>
        <div className="button-container-1">
          <button className="start-button" onClick={() => handleModeSelection('single')}>
            Single Player
          </button>
          <button className="start-button" onClick={() => handleModeSelection('multiplayer')}>
            Multiplayer
          </button>
        </div>
        <Link to="/dashboard">
          <h2 className="prompt-text-21">&larr; Back</h2>
        </Link>
      </div>

      {/* Question Icon at Bottom Right */}
      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Type;


