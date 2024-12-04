import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import { FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "./difficulty.css";
import axios from "axios"; // For making API requests
import Preloader from "../preloader/preloader"; // Import Preloader component

const Difficulty = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [loading, setLoading] = useState(true); // To show the loading state
  const navigate = useNavigate(); // Initialize navigate for routing
  const location = useLocation(); // Access the location object to get the state passed from navigate()

  const [mode, setMode] = useState(""); // Store the mode (single or multiplayer)
  const [difficulty, setDifficulty] = useState(""); // Store the difficulty (easy, medium, hard)
  const [roomCode, setRoomCode] = useState(""); // State to store the room code

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
      fetchSessionData(); // Fetch session data after 3 seconds delay
    }, 3000); // Simulate the loading time by delaying the fetch

    // Get the mode passed via state
    if (location.state && location.state.mode) {
      setMode(location.state.mode);
    }
  }, [navigate, location.state]);

  // If still loading, show a loading state
  if (loading) {
    return <Preloader />; // Show preloader for 3 seconds
  }

  // Handle difficulty button click (auto navigate when clicked)
  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    navigate("/begin", { state: { mode, difficulty } }); // Passing mode and difficulty to the next page
  };

  // Handle room code change (wait until arrow button is clicked)
  const handleRoomCodeChange = (e) => {
    setRoomCode(e.target.value);
  };

  // Handle the arrow button click for joining the game
  const handleJoinGame = () => {
    // Only navigate when the arrow button is clicked and a room code exists
    if (roomCode) {
      navigate("/begin", { state: { mode, difficulty, roomCode } });
    }
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
        <h2 className="prompt-text">
          Selected Mode: <b>{mode === "single" ? "Single Player" : "Multiplayer"}</b>
        </h2>

        {/* Difficulty selection buttons */}
        <h2 className="prompt-text">Select Difficulty</h2>
        <div className="button-container-3">
          <button className="start-button" onClick={() => handleDifficultyChange('Easy')}>
            Easy
          </button>
          <button className="start-button" onClick={() => handleDifficultyChange('Medium')}>
            Medium
          </button>
          <button className="start-button" onClick={() => handleDifficultyChange('Hard')}>
            Hard
          </button>
        </div>
        <br />

        {/* Multiplayer room code section */}
        {mode === "multiplayer" && (
          <div className="room-code-container">
            or
            <br />
            <h3 className="room-code-text">Enter Room Code</h3>
            <br />
            <div className="input-container">
              <input
                type="text"
                placeholder="Room Code"
                value={roomCode}
                onChange={handleRoomCodeChange}
                className="room-code-input"
              />
              <button className="arrow-button" onClick={handleJoinGame}>
                <FaArrowRight size={20} /> {/* Arrow icon */}
              </button>
            </div>
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





