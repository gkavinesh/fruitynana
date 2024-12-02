import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import { FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./difficulty.css";
import axios from "axios"; // For making API requests

const Difficulty = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [loading, setLoading] = useState(true); // To show the loading state
  const navigate = useNavigate(); // Initialize navigate for routing
  const location = useLocation(); // Access the location object to get the state passed from navigate()

  const [mode, setMode] = useState(""); // Store the mode (single or multiplayer)
  const [roomCode, setRoomCode] = useState(""); // Store the room code input (only for multiplayer)

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

    fetchSessionData(); // Fetch session data when the component mounts

    // Get the mode passed via state
    if (location.state && location.state.mode) {
      setMode(location.state.mode);
    }
  }, [navigate, location.state]);

  // If still loading, show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle room code change
  const handleRoomCodeChange = (e) => {
    setRoomCode(e.target.value);
  };

  return (
    <div className="difficulty-container">
      <div className="difficulty-header">
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

      <div className="difficulty-content">
        <h2 className="prompt-text">Selected Mode: {mode === "single" ? "Single Player" : "Multiplayer"}</h2>

        {/* Difficulty selection buttons */}
        <h2 className="prompt-text">Select Difficulty</h2>
        <div className="button-container-3">
          <button className="start-button">Easy</button>
          <button className="start-button">Medium</button>
          <button className="start-button">Hard</button>
        </div>
        <br></br>
        

        {/* Multiplayer room code section */}
        {mode === "multiplayer" && (
            
          <div className="room-code-container">
            or
            <h3 className="room-code-text">Enter Room Code</h3>
            <input
              type="text"
              placeholder="Room Code"
              value={roomCode}
              onChange={handleRoomCodeChange}
              className="room-code-input"
            />
            <button className="start-button">Join Game</button>
          </div>
        )}

        <Link to="/type">
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

export default Difficulty;


