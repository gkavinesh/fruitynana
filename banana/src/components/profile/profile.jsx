import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import { FaBell, FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./profile.css";
import axios from "axios"; // For making API requests
import Preloader from "../preloader/preloader"; // Import the Preloader component

const Profile = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [loading, setLoading] = useState(true); // To show the loading state
  const navigate = useNavigate(); // Initialize navigate for routing
  const [userRank, setUserRank] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [userScores, setUserScores] = useState([]);

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

  // Fetch all user scores and rank them
  const fetchUserScores = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/all-scores");
      const sortedScores = response.data.sort((a, b) => b.score - a.score);
      setUserScores(sortedScores);
      const rank = sortedScores.findIndex((player) => player.name === passedUserName) + 1;
      setUserRank(rank);
    } catch (err) {
      console.error("Error fetching user scores:", err);
    }
  };

  useEffect(() => {
    const fetchSessionData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/users/session", { withCredentials: true });
          
          // Assuming the API returns an object like { name: 'John Doe', score: 100 }
          const name = response.data.name;
          const score = response.data.score; // Extract score from the response
          
          setUserName(name); // Set the user's name
          setUserScore(score || 0); // Set the user's score, defaulting to 0 if undefined
          
          await fetchUserScores(); // Fetch the leaderboard data
          setLoading(false); // Turn off loading state
        } catch (err) {
          console.error("Error fetching session data:", err);
          setLoading(false); // Turn off loading state in case of error
          navigate("/login"); // Redirect to login page if there's an error
        }
      };

    fetchSessionData();
  },);


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
          <button className="icon-button">
            <FaUserAlt size={24} />
          </button>
          <button className="icon-button" onClick={logoutUser}>
            <FaSignOutAlt size={24} />
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <p className="hello-1">Welcome to the leaderboard, <b>{userName || "User"}</b></p> {/* Display the user's first name */}
      </div>

      <div className="score-table-container-1">
        <h2>Your Leaderboard</h2>
          <table className="score-table-1">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {userScores.map((player, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/dashboard">
          <h2 className="prompt-text-21">&larr; Back to Dashboard</h2>
        </Link>
      {/* Question Icon at Bottom Right */}
      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Profile;