import React, { useEffect, useState } from "react";
import "./preloader.css";

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(3); // Initial countdown value

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000); // Countdown every second
      return () => clearTimeout(timer); // Cleanup the timer
    } else {
      onComplete(); // Trigger the callback when countdown reaches 0
    }
  }, [count, onComplete]);

  return (
    <div className="preloader-container">
      <div className="countdown">{count > 0 ? count : "Go!"}</div>
    </div>
  );
};

export default Preloader;
