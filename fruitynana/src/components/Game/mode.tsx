import React from 'react';
import Link from 'next/link';

const SelectPlayerMode: React.FC = () => {
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
        <h2 className="text-4xl font-bold mb-8 text-gray-300">Select Player Mode</h2>
        <br></br>
        <div className="flex space-x-4 mb-4">
          <Link href="/difficulty">
            <button className="bg-yellow-400 text-black font-semibold py-3 px-10 rounded-lg shadow-lg hover:bg-yellow-500 transition-all hover:scale-105">
              Single Player
            </button>
          </Link>
          <Link href="/difficulty">
            <button className="bg-yellow-400 text-black font-semibold py-3 px-10 rounded-lg shadow-lg hover:bg-yellow-500 transition-all hover:scale-105">
              Multiplayer
            </button>
          </Link>
        </div>
        <br></br>
        <Link href="/welcome">
          <p className="text-gray-600 hover:underline cursor-pointer mt-4">
            ← Back
          </p>
        </Link>
      </div>

      {/* Bottom Right Help Icon */}
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

export default SelectPlayerMode;
