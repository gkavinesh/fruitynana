import React, { useState } from 'react';
import Link from 'next/link';

const SelectDifficulty: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const handleSelectDifficulty = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
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
          <button aria-label="Notifications" className="text-2xl">
            🔔
          </button>
          <button aria-label="Profile" className="text-2xl">
            👤
          </button>
          <button aria-label="Settings" className="text-2xl">
            ⚙️
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center mt-16">
        <h2 className="text-xl mb-4">Single Player</h2>
        <h2 className="text-3xl font-bold mb-8">Select Difficulty</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleSelectDifficulty('Easy')}
            className={`py-3 px-8 rounded-lg shadow-lg font-semibold transition-all ${
              selectedDifficulty === 'Easy' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-black hover:bg-yellow-400'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => handleSelectDifficulty('Medium')}
            className={`py-3 px-8 rounded-lg shadow-lg font-semibold transition-all ${
              selectedDifficulty === 'Medium' ? 'border-2 border-black text-black' : 'bg-gray-200 text-black hover:bg-yellow-400'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => handleSelectDifficulty('Hard')}
            className={`py-3 px-8 rounded-lg shadow-lg font-semibold transition-all ${
              selectedDifficulty === 'Hard' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-black hover:bg-yellow-400'
            }`}
          >
            Hard
          </button>
        </div>
        <Link href="/">
          <p className="text-gray-600 hover:underline cursor-pointer mt-4">
            ← Back
          </p>
        </Link>
      </div>

      {/* Bottom Right Help Icon */}
      <div className="absolute bottom-4 right-4">
        <Link href="/help">
          <button
            aria-label="Help"
            className="text-3xl p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
          >
            ❓
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectDifficulty;
