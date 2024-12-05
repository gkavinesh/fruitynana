import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bananaLogo from "../../assets/banana.png";
import { FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./begin.css";
import axios from "axios";
import Preloader from "../preloader/preloader";

const Begin = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [roomCode, setRoomCode] = useState("");

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

        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (err) {
        console.error("Error fetching session data:", err);
        setLoading(false);
        navigate("/login");
      }
    };

    fetchSessionData();

    if (location.state) {
      setMode(location.state.mode);
      setDifficulty(location.state.difficulty);
    }
  }, [navigate, location.state]);

  if (loading) {
    return <Preloader />;
  }

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

      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Begin;




