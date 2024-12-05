import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import { FaBell, FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./dashboard.css";
import axios from "axios"; // For making API requests
import Preloader from "../preloader/preloader"; // Import the Preloader component

const Dashboard = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [loading, setLoading] = useState(true); // To show the loading state
  const navigate = useNavigate(); // Initialize navigate for routing

   // Logout User function
   const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        // Redirect to login page after successful logout
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Fetch session data on component mount
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/session", {
          withCredentials: true, // Ensure the session cookie is included
        });

        // Successfully got session data
        const fullName = response.data.name;
        const firstName = fullName.split(" ")[0]; // Get the first name by splitting the full name
        setUserName(firstName); // Set the user's first name

        console.log("Session ID: ", response.data.sessionId); // Log the session ID (if returned by the backend)

        // Add a 3-second delay to show the preloader
        setTimeout(() => {
          setLoading(false); // Set loading to false after 3 seconds
        }, 3000);

      } catch (err) {
        console.error("Error fetching session data:", err);
        setLoading(false); // Set loading to false even if there's an error
        navigate("/login"); // Redirect to login page if no session is found
      }
    };

    fetchSessionData(); // Fetch session data when the component mounts
  }, [navigate]);

  // If still loading, show the preloader
  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-1">
        <div className="logo-container">
          <img src={bananaLogo} alt="Fruitynana Logo" className="logo" />
          <h1 className="app-title">fruitynana</h1>
        </div>
        <div className="icons-container">
          <Link to="/profile"><button className="icon-button">
            <FaUserAlt size={24} />
          </button></Link>
          <button className="icon-button" onClick={logoutUser}>
            <FaSignOutAlt size={24} />
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <p className="hello">Hi, <b>{userName || "User"}</b></p> {/* Display the user's first name */}
        <h2 className="prompt-text">Shall we begin?</h2>
        <Link to="/type"><button className="button-57" role="button">
          <span className="text-2">Ready to play?</span>
          <span className="build">Build Now !</span>
        </button></Link>
        <h2 className="prompt-text-2"><Link to="/explore">Explore the game</Link></h2>
      </div>

      {/* Question Icon at Bottom Right */}
      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Dashboard;














