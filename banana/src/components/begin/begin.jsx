import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import { FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./begin.css";
import axios from "axios"; // For making API requests
import Preloader from "../preloader/preloader"; // Import Preloader component

const Begin = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [loading, setLoading] = useState(true); // To show the loading state
  const navigate = useNavigate(); // Initialize navigate for routing
  const location = useLocation(); // Access the location object to get the state passed from navigate()

  const [mode, setMode] = useState(""); // Store the mode (single or multiplayer)
  const [difficulty, setDifficulty] = useState(""); // Store the difficulty (easy, medium, hard)
  const [roomCode, setRoomCode] = useState(""); // State to store the room code

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

        // Delay the loading state change by 3 seconds
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

    // Get the mode and difficulty passed via state
    if (location.state) {
      setMode(location.state.mode);
      setDifficulty(location.state.difficulty);
    }
  }, [navigate, location.state]);

  // If still loading, show a loading state
  if (loading) {
    return <Preloader />; // Show preloader for 3 seconds
  }

  // Handle room code change
  const handleRoomCodeChange = (e) => {
    setRoomCode(e.target.value);
  };

  return (
    <div className="begin-container">
      <div className="begin-header">
        <div className="logo-container-begin">
          <img src={bananaLogo} alt="Fruitynana Logo" className="logo-begin" />
          <h1 className="app-title-begin">fruitynana</h1>
        </div>
        <div className="icons-container-begin">
          <button className="icon-button">
            <FaUserAlt size={24} />
          </button>
          <button className="icon-button" onClick={logoutUser}>
            <FaSignOutAlt size={24} />
          </button>
        </div>
      </div>

      <div className="begin-content">
        <h2 className="prompt-text-begin">
          Selected Mode: <b>{mode === "single" ? "Single Player" : "Multiplayer"}</b>
        </h2>
        <h2 className="prompt-text-begin">
          Selected Difficulty: <b>{difficulty}</b>
        </h2>
        <br></br>
        <br></br>
        <br></br>
        <h2 className="prompt-text-begin">
          Your game is ready, you can proceed to play
        </h2>
        <br />

        <button className="next-button-2" onClick={() => {
              // Passing mode and difficulty to the game page
              navigate("/game", { state: { mode, difficulty } });
            }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="arrow-icon-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
      </div>

      {/* Question Icon at Bottom Right */}
      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Begin;



