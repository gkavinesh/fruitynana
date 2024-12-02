import React from 'react';
import Lottie from 'react-lottie'; // Import Lottie
import animationData from '../../assets/preloader.json'; // Import your Lottie JSON file
import './preloader.css'; // Import the custom CSS

const Preloader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, // Automatically play the animation
    animationData: animationData, // The Lottie JSON animation
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Ensures animation fits within container
    },
  };

  return (
    <div className="preloader-container">
      <Lottie options={defaultOptions} height={200} width={200} /> {/* Adjust size as needed */}
    </div>
  );
};

export default Preloader;


