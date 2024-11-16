"use client"
import React, { useState, useEffect } from 'react';
import Mode from '../../components/Game/mode';
import Preloader from '../../components/preloader/preloader'; // Import the Preloader component

const SignUpPage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading effect (you can adjust the duration or use a real loading trigger)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md">
        <Mode />
      </div>
    </div>
  );
};

export default SignUpPage;