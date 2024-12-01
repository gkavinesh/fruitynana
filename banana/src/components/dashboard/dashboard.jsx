import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import "./dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState(""); // Store the logged-in user's name
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/session", {
          credentials: "include", // Include cookies for session management
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name); // Set the name from the session data
        } else {
          navigate("/login"); // Redirect to login if session is invalid
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        navigate("/login"); // Redirect to login on error
      }
    };

    fetchSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include", // Include cookies for session
      });
      if (response.ok) {
        navigate("/login"); // Redirect to login after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="logo-container">
          <img src={bananaLogo} alt="Fruitynana Logo" className="logo" />
          <h1 className="app-title">fruitynana</h1>
        </div>
        <div className="icons-container">
          <button aria-label="Notifications" className="icon-button">🔔</button>
          <button aria-label="Profile" className="icon-button">👤</button>
          <button aria-label="Settings" className="icon-button">⚙️</button>
          <button aria-label="Logout" className="icon-button" onClick={handleLogout}>🚪</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <p className="welcome-text-2">Hi {userName || "User"}</p>
        <h2 className="prompt-text">Shall we begin?</h2>
        <button className="start-button" onClick={() => navigate("/create-game")}>
          Create my game →
        </button>
        <p className="explore-profile" onClick={() => navigate("/profile")}>
          Explore my profile
        </p>
      </div>
    </div>
  );
};

export default Dashboard;





