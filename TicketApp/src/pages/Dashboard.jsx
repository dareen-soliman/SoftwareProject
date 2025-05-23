// src/pages/Nav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate("/profile");
  };
    const handleGoToMyEvents = () => {
    navigate("/events");
  };
   const handleGoToMyBookings = () => {
    navigate("/user-bookings");
  };
  const handleGoToMyEvent = () => {
    navigate("/my-events");
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard!</h2>
      <p>You are now logged in.</p>
      <button onClick={handleGoToProfile}>Go to Profile</button>
       <button onClick={handleGoToMyEvents}>View All Events</button>
        <button onClick={handleGoToMyBookings}>View My Bookings</button>
        <button onClick={handleGoToMyEvent}>View My events</button>
    </div>
  );
}

export default Dashboard;
