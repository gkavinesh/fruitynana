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
        <Image src={banana} alt="Banana Logo" className="w-44 h-44 p-12" />
      </div>

      <div className="absolute top-4 right-4 flex space-x-10 p-8">
        <div className="w-44 h-44 bg-yellow-400 rounded-full"></div>
        <div className="w-44 h-44 bg-yellow-400 rounded-full"></div>
        <div className="w-44 h-44 bg-yellow-400 rounded-full"></div>
      </div>

      {/* Main content positioned at bottom-left */}
      <div className="absolute bottom-0 left-0 p-12 flex items-center gap-10"> {/* Added flex and gap classes */}
        <h1 className="text-[350px] text-black font-light ml-10">Welcome</h1>
        <div>
          <button
            onClick={handleButtonClick} // Attach the click handler
            className="w-44 h-44 border border-black rounded-full flex items-center justify-center hover:bg-yellow-400 hover:scale-75 transition mt-14 ml-16"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              className="w-16 h-16"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>


      {/* Bottom right button */}
    </div>
  );
};

export default WelcomeScreen;







