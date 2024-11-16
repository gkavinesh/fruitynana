import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Header Section */}
      <div className="absolute top-0 left-0 p-4 flex items-center w-full justify-between">
        <div className="flex items-center space-x-4">
          <img src="/banana.png" alt="Fruitynana Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-black">fruitynana</h1>
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
      <div className="text-center mt-10">
        <p className="text-3xl mb-6 text-gray-800">Hi <b>Kavin</b></p>
        <h2 className="text-3xl font-bold mb-6 text-gray-600">Shall we begin?</h2>
        <Link href="/select-mode">
          <button className="inline-block bg-yellow-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-all hover:scale-105">
            Create my game →
          </button>
        </Link>
        <p className="mt-4 text-gray-600">
          <Link href="/profile" className="hover:underline">
            Explore my profile
          </Link>
        </p>
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

export default HomePage;

