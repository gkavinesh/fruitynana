"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Make sure you are using this correctly in a client component context
import Image from 'next/image';
import banana from '@/app/assets/banana.png';
import Preloader from '../components/preloader/preloader'; // Import the Preloader component

const WelcomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  // Simulate a loading effect (you can adjust the duration or use a real loading trigger)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleButtonClick = () => {
    // Ensure that the router push only runs in the browser context
    if (typeof window !== 'undefined') {
      router.push('/sign-up'); // Navigate to the sign-up page
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative">
      {/* Top section */}
      <div className="absolute top-4 left-4">
        <Image src={banana} alt="Banana Logo" className="w-36 h-36 p-8" />
      </div>

      <div className="absolute top-4 right-4 flex space-x-4 p-8">
        <div className="w-36 h-36 bg-yellow-400 rounded-full"></div>
        <div className="w-36 h-36 bg-yellow-400 rounded-full"></div>
        <div className="w-36 h-36 bg-yellow-400 rounded-full"></div>
      </div>

      {/* Main content positioned at bottom-left */}
      <div className="absolute bottom-0 left-0 p-12">
        <h1 className="text-[300px] text-black font-regular">Welcome</h1>
      </div>

      {/* Bottom right button */}
      <div className="absolute bottom-4 right-4 p-12">
        <button
          onClick={handleButtonClick} // Attach the click handler
          className="w-44 h-44 border rounded-full flex items-center justify-center hover:bg-black transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;







