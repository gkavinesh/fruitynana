import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import bananaLogo from "../../assets/banana.png"; // Adjust the path to your logo
import { FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import axios from "axios";
import Preloader from "../preloader/preloader"; // Import Preloader component
import "./score.css";

const Score = () => {
  const [loading, setLoading] = useState(true);
  const [userScores, setUserScores] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [userName, setUserName] = useState("");
  const [emoji, setEmoji] = useState("");  // State to store the emoji
  const navigate = useNavigate();
  const location = useLocation();
  const { score, userName: passedUserName } = location.state || {};
  const [quote, setQuote] = useState('');

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

  const fetchEmoji = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/emoji");
      setEmoji(response.data.emoji || "😀"); // Set emoji if available, else fallback to default
    } catch (err) {
      console.error("Error fetching emoji:", err);
      setEmoji("😀"); // Fallback emoji if the API fails
    }
  };

  const fetchQuote = async () => {
    try {
      // Using a public CORS proxy
      const response = await axios.get("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random"));
      const quoteData = JSON.parse(response.data.contents)[0];  // Parse the JSON data received from the proxy
      setQuote(`${quoteData.q} - ${quoteData.a}`);  // Set the quote and author
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };
  

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/session", { withCredentials: true });
        setUserName(response.data.name);
        setUserScore(score || 0);
        await fetchUserScores();
        await fetchEmoji(); // Fetch emoji after session data is fetched
        await fetchQuote(); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching session data:", err);
        setLoading(false);
        navigate("/login");
      }
    };

    fetchSessionData();
  }, [score, passedUserName, navigate]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="score-container">
      <div className="score-header">
        <div className="logo-container-score">
          <img src={bananaLogo} alt="Fruitynana Logo" className="logo-score" />
          <h1 className="app-title-score">fruitynana</h1>
        </div>
        <div className="icons-container-score">
          <button className="icon-button"><FaUserAlt size={24} /></button>
          <button className="icon-button" onClick={logoutUser}>
            <FaSignOutAlt size={24} />
          </button>
        </div>
      </div>

      <div className="score-content">
        <h2 className="score-text">
          Well Done {emoji} <b>{userName}</b>!<br></br><br></br> Your Score: <b>{userScore}</b>  {/* Display emoji */}
        </h2>
        <h3 className="rank-text">Your Rank: <b>{userRank ? `#${userRank}` : "Loading..."}</b></h3>

        {/* Display the user scores in a table */}
        <div className="score-table-container">
          <table className="score-table">
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

        {/* Link to go back to the dashboard */}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <blockquote>{quote}</blockquote>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Link to="/dashboard">
          <h2 className="prompt-text-21">Go to Dashboard &larr;</h2>
        </Link>

      {/* Question Icon at Bottom Right */}
      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Score;



