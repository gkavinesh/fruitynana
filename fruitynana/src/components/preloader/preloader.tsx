import React from 'react';
import './preloader.css'; // Import the custom CSS for the rotation animation

const Preloader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Preloader;
