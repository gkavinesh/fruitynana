import React, { useState, useEffect } from "react";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import "./game.css";

const Game = () => {
  const [questionImage, setQuestionImage] = useState(""); // To store the image URL
  const [solution, setSolution] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // 60 seconds for the game
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");

  const fetchGameData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/game", {
        credentials: "include", // Include cookies if necessary
      });
      const data = await response.json();
      setQuestionImage(data.question); // Set the question image URL
      setSolution(data.solution); // Set the correct solution
      setOptions(data.options); // Set the shuffled options
    } catch (error) {
      console.error("Error fetching game data from backend:", error);
    }
  };
  

  // Timer logic
  useEffect(() => {
    fetchGameData(); // Fetch data when the component loads

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown); // Stop timer when it reaches zero
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Handle option click
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === solution) {
      setScore((prev) => prev + 1);
      setMessage("Correct!");
    } else {
      setMessage("Wrong! Try again.");
    }

    setTimeout(() => {
      setMessage("");
      setSelectedOption(null);
      fetchGameData(); // Fetch new question
    }, 1500); // Delay before moving to the next question
  };

  return (
    <div className="game-container">
      {/* Header Section */}
      <header className="game-header">
        <div className="logo-container">
          <img src={bananaLogo} alt="Fruitynana Logo" className="logo" />
          <h1 className="app-title">fruitynana</h1>
        </div>
        <div className="timer">{`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`}</div>
        <div className="icons-container">
          <button aria-label="Notifications" className="icon-button">🔔</button>
          <button aria-label="Profile" className="icon-button">👤</button>
          <button aria-label="Settings" className="icon-button">⚙️</button>
        </div>
      </header>

      {/* Score Section */}
      <div className="score-section">
        <p>SCORE</p>
        <p className="score">{score}</p>
      </div>

      {/* Game Content */}
      <div className="game-content">
        {/* Display Question Image */}
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
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default Game;

