import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa"; // Ensure icons are imported
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import "./explore.css";
import axios from "axios"; // For making API requests
import Preloader from "../preloader/preloader"; // Import the Preloader component

const Explore = () => {
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
                setUserName(response.data.name); // Set the user's name
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
        <div className="explore-container">
            <div className="explore-header-1">
                <div className="logo-container-explore">
                    <img src={bananaLogo} alt="Fruitynana Logo" className="logo-explore" />
                    <h1 className="app-title-explore">fruitynana</h1>
                </div>
                <div className="icons-container-explore">
                    <button className="icon-button">
                        <FaUserAlt size={24} />
                    </button>
                    <button className="icon-button" onClick={logoutUser}>
            <FaSignOutAlt size={24} />
          </button>
                </div>
            </div>

            <div className="explore-content">

                {/* Game Instructions Section */}
                <div className="instructions-section">
                    <h2 className="instructions-title">Game Instructions</h2>
                    <p className="instructions-text">
                        Welcome to Fruitynana, a fun and challenging puzzle game! Your goal is to replace the banana with the correct number based on the puzzle rules.
                    </p>
                    <p className="instructions-text">
                        The game has three difficulty levels, each with its own set of challenges:
                    </p>
                    <ul className="instructions-list">
                        <li>
                            <strong>Easy:</strong> You’ll have more time to solve the puzzle, but you’ll earn fewer points (1 point per correct answer). If you answer incorrectly, no points are deducted.
                        </li>
                        <li>
                            <strong>Medium:</strong> A balanced level of challenge with moderate time and points (2 points per correct answer). However, if your answer is wrong, you lose 1 point.
                        </li>
                        <li>
                            <strong>Hard:</strong> Less time to solve each puzzle but higher rewards for success (3 points per correct answer). On incorrect answers, you lose 2 points, so accuracy is key!
                        </li>
                    </ul>
                    <p className="instructions-text">
                        Want to take the challenge to the next level? Fruitynana also features an exciting multiplayer mode where you can compete with friends in real-time. Outsmart your opponents and score the highest points to claim victory!
                    </p>
                    <p className="instructions-text">
                        Select your difficulty, solve puzzles to score points, and climb the leaderboard to become the ultimate Fruitynana puzzle master!
                    </p>
                    <p className="instructions-text">
                        Good luck, and may the juiciest player win!
                    </p>
                </div>

                <h2 className="prompt-text-2-explore"><Link to="/dashboard">Go to Dashboard &rarr;</Link></h2>
            </div>
        </div>
    );
};

export default Explore;
