"use client";

import React, { useState, useEffect } from "react";
import { fetchGameData, checkAnswer } from "../../lib/bananaService";

const Game: React.FC = () => {
  // State management
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [question, setQuestion] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  // Fetch initial game data from the Banana API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGameData();
        setQuestion(data.question || "No question available"); // Update this based on your actual API response structure
        setImageURL(data.image || null); // Update this based on your actual API response structure
      } catch (error) {
        setMessage("Error loading game data. Please try again.");
      }
    };

    fetchData();
  }, []);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await checkAnswer(inputValue);
      if (data.success) { // Adjust condition based on actual API response structure
        setMessage("Correct! Great job!");
        setScore(score + 10); // Increment score for correct answer (example logic)
      } else {
        setMessage("Incorrect. Try again.");
      }
    } catch (error) {
      setMessage("Error checking your answer. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Header Section */}
      <div className="absolute top-0 left-0 p-4 flex items-center w-full justify-between">
        <div className="flex items-center space-x-2">
          <img src="/banana.png" alt="Fruitynana Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold">fruitynana</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button aria-label="Notifications" className="text-2xl">🔔</button>
          <button aria-label="Profile" className="text-2xl">👤</button>
          <button aria-label="Settings" className="text-2xl">⚙️</button>
        </div>
      </div>

      {/* Timer and Score Display */}
      <div className="flex items-center justify-between w-full max-w-lg my-4">
        <div className="text-center">
          <p className="text-lg">SCORE</p>
          <p className="text-4xl font-bold">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-mono">{new Date(timer * 1000).toISOString().substr(14, 5)}</p>
        </div>
      </div>

      {/* Game Content */}
      <div className="my-6">
        {question && <p className="text-center mb-4 text-xl">Question: {question}</p>}
        {imageURL ? (
          <div className="flex justify-center mb-4">
            <img src={imageURL} alt="Banana Game" className="w-64 h-auto" onError={(e) => {
              console.error("Image failed to load:", imageURL);
              e.currentTarget.style.display = 'none'; // Hide image if it fails to load
            }} />
          </div>
        ) : (
          <p className="text-center">Image not available</p>
        )}
      </div>


      {/* User Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your answer..."
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="py-2 px-6 border border-black text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          Submit →
        </button>
      </form>

      {message && <p className="text-center mt-4 text-red-500">{message}</p>}

      {/* Bottom Help Icon */}
      <div className="absolute bottom-4 right-4">
        <button
          aria-label="Help"
          className="text-3xl p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
        >
          ❓
        </button>
      </div>
    </div>
  );
};

export default Game;



