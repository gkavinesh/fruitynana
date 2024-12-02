import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import { FaBell, FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./dashboard.css";
import axios from "axios"; // For making API requests
import Preloader from "../preloader/preloader"; // Import the Preloader component

const Dashboard = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [loading, setLoading] = useState(true); // To show the loading state
  const navigate = useNavigate(); // Initialize navigate for routing

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

        // Add a 3-second delay to show the preloader
        setTimeout(() => {
          setLoading(false); // Set loading to false after 3 seconds
        }, 3000);

      } catch (err) {
        console.error("Error fetching session data:", err);
        setLoading(false); // Set loading to false even if there's an error
        navigate("/login"); // Redirect to login page if no session is found
      }
    };

    fetchSessionData(); // Fetch session data when the component mounts
  }, [navigate]);

  // If still loading, show the preloader
  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo-container">
          <img src={bananaLogo} alt="Fruitynana Logo" className="logo" />
          <h1 className="app-title">fruitynana</h1>
        </div>
        <div className="icons-container">
          <button className="icon-button">
            <FaUserAlt size={24} />
          </button>
          <button className="icon-button">
            <FaCog size={24} />
          </button>
          <button className="icon-button">
            <FaSignOutAlt size={24} />
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <p className="hello">Hi, <b>{userName || "User"}</b></p> {/* Display the user’s name */}
        <h2 className="prompt-text">Shall we begin?</h2>
        <Link to="/type"><button className="start-button">Create my game →</button></Link>
        <h2 className="prompt-text-2"><Link to="/about">learn more about the game here</Link></h2>
      </div>

      {/* Question Icon at Bottom Right */}
      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Dashboard;













