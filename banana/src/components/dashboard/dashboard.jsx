import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bananaLogo from "../../assets/banana.png";
import { FaBell, FaUserAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "./dashboard.css";
import axios from "axios";
import Preloader from "../preloader/preloader";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/session", {
          withCredentials: true,
        });

        const fullName = response.data.name;
        const firstName = fullName.split(" ")[0];
        setUserName(firstName);

        console.log("Session ID: ", response.data.sessionId);

        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (err) {
        console.error("Error fetching session data:", err);
        setLoading(false);
        navigate("/login");
      }
    };

    fetchSessionData();
  }, [navigate]);

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
        <p className="hello">Hi, <b>{userName || "User"}</b></p>
        <h2 className="prompt-text">Shall we begin?</h2>
        <Link to="/type"><button className="button-57" role="button">
          <span className="text-2">Ready to play?</span>
          <span className="build">Build Now !</span>
        </button></Link>
        <h2 className="prompt-text-2"><Link to="/explore">Explore the game</Link></h2>
      </div>

      <div className="question-icon-container">
        <FaQuestionCircle size={32} />
      </div>
    </div>
  );
};

export default Dashboard;















