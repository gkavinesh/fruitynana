import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bananaLogo from "../../assets/banana.png";
import { FaClock, FaThumbsUp, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import Preloader from "../loader/preloader"; // Import the Preloader component
import "./game.css";

const Game = () => {
  const [questionImage, setQuestionImage] = useState("");
  const [solution, setSolution] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");
  const [showGame, setShowGame] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Add userEmail state
  const navigate = useNavigate();

  // Getting mode and difficulty from location state
  const location = useLocation();
  const { mode, difficulty } = location.state || {}; // Retrieve mode and difficulty

  // Show preloader before displaying the game
  useEffect(() => {
    const preloaderTimeout = setTimeout(() => setShowGame(true), 3000); // 3-second delay for preloader
    return () => clearTimeout(preloaderTimeout); // Cleanup
  }, []);

  // Fetch session data to get the user's name
  const fetchSessionData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/session", {
        withCredentials: true,
      });
      setUserName(response.data.name); // Set the username from session data
    } catch (error) {
      console.error("Error fetching session data:", error);
      navigate("/login"); // Redirect to login if session is invalid
    }
  };

  // Fetch game data (question and options)
  const fetchGameData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/game", {
        credentials: "include",
      });
      const data = await response.json();
      setQuestionImage(data.question);
      setSolution(data.solution);
      setOptions(data.options || []); // Default to empty array if options are invalid
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  // Save the user's final score to the backend
  const saveScore = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/score", // Backend API for saving score
        { email: userEmail, score }, // Pass userEmail and score
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Score saved successfully!");
      } else {
        console.error("Failed to save score.");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };


  // Timer logic
  useEffect(() => {
    if (!showGame) return;

    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      saveScore(); // Save score when the timer ends
      alert(`Game over! Your score: ${score}`);
      navigate("/"); // Redirect to the homepage or results page
    }
  }, [timer, showGame]);

  useEffect(() => {
    fetchSessionData(); // Fetch session data on component mount
    if (showGame) fetchGameData(); // Fetch game data only after preloader ends
  }, [showGame]);

  // Handle user answer selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);

    let scoreIncrement = 0;
    let scoreDecrement = 0;

    if (difficulty === "Easy") {
      scoreIncrement = 1;
      scoreDecrement = 0;
    } else if (difficulty === "Medium") {
      scoreIncrement = 2;
      scoreDecrement = -1;
    } else if (difficulty === "Hard") {
      scoreIncrement = 3;
      scoreDecrement = -2;
    }

    if (option === solution) {
      setScore((prev) => prev + scoreIncrement); // Add score for correct answer
      setMessage("Correct!");
    } else {
      setScore((prev) => prev + scoreDecrement); // Deduct score for wrong answer
      setMessage("Wrong! Try again.");
    }

    // Reset for the next question
    setTimeout(() => {
      setMessage("");
      setSelectedOption(null);
      fetchGameData(); // Fetch a new question
    }, 1000);
  };

  // Show preloader or game
  if (!showGame) {
    return <Preloader />;
  }

  return (
    <div className="game-container">
      {/* Header Section */}
      <header className="game-header">
        <div className="logo-container-game">
          <img src={bananaLogo} alt="Fruitynana Logo" className="logo" />
          <h1 className="app-title">fruitynana</h1>
        </div>
        <div className="user-info">
          <p>Welcome, {userName}</p>
        </div>
        <div className="icons-container-game">
          <FaClock size={24} className="icon" />
          <div className="timer-game">{`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`}</div>
        </div>
      </header>

      {/* Score Section */}
      <div className="score-section">
        <p>SCORE</p>
        <p className="score">{score}</p>
      </div>

      {/* Game Content */}
      <div className="game-content">
        {questionImage ? (
          <img src={questionImage} alt="Question" className="question-image" />
        ) : (
          <p>Loading question...</p>
        )}
      </div>

      {/* Options Section */}
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`option-button ${
              selectedOption === option ? (option === solution ? "correct" : "wrong") : ""
            }`}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback Message */}
      {message && (
        <div className={`feedback-message ${message === "Correct!" ? "correct" : "wrong"}`}>
          {message === "Correct!" ? <FaThumbsUp /> : <FaTimesCircle />}
          {message}
        </div>
      )}
    </div>
  );
};

export default Game;







