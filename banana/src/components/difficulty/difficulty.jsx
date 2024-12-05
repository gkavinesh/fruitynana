import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; 
import { FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "./difficulty.css";
import axios from "axios"; 
import Preloader from "../preloader/preloader"; 

const Difficulty = () => {
  const [userName, setUserName] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const [mode, setMode] = useState(""); 
  const [difficulty, setDifficulty] = useState(""); 
  const [roomCode, setRoomCode] = useState(""); 

  // Logout User function
  const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

 
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/session", {
          withCredentials: true, 
        });

        
        setUserName(response.data.name); 
        console.log("Session ID: ", response.data.sessionId); 

        setLoading(false);
      } catch (err) {
        console.error("Error fetching session data:", err);
        setLoading(false); 
        navigate("/login"); 
      }
    };

    setTimeout(() => {
      fetchSessionData(); 
    }, 3000); 


    if (location.state && location.state.mode) {
      setMode(location.state.mode);
    }
  }, [navigate, location.state]);


  if (loading) {
    return <Preloader />; 
  }


  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    navigate("/begin", { state: { mode, difficulty } }); 
  };


  const handleRoomCodeChange = (e) => {
    setRoomCode(e.target.value);
  };


  const handleJoinGame = () => {

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
          <button className="icon-button" onClick={logoutUser}>
            <FaSignOutAlt size={24} />
          </button>
        </div>
      </div>

      <div className="difficulty-content">
        <h2 className="prompt-text">
          Selected Mode: <b>{mode === "single" ? "Single Player" : "Multiplayer"}</b>
        </h2>


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
                <FaArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        <Link to="/type">
          <h2 className="prompt-text-21">&larr; Back</h2>
        </Link>
      </div>

      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Difficulty;





