// src/pages/Nav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/profile");
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard!</h2>
      <p>You are now logged in.</p>
      <button onClick={handleGoToDashboard}>Go to Profile</button>
    </div>
  );
}

export default Dashboard;
