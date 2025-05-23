// src/pages/Nav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate("/profile");
  };
    const handleGoToAllEvents = () => {
    navigate("/");
  };
   const handleGoToMyBookings = () => {
    navigate("/user-bookings");
  };
    const handleGoToMyEvents = () => {
    navigate("/my-events");
  };
      const handleGoToAdminevent = () => {
    navigate("/admin/events");
  };

     const handleGoToAdminUser = () => {
    navigate("/admin/users");
  };
  
 

  return (
    <div>
      <h2>Welcome to Your Dashboard!</h2>
      <p>You are now logged in.</p>
      <button onClick={handleGoToProfile}>Go to Profile</button>
       <button onClick={handleGoToAllEvents}>View All Events</button>
        <button onClick={handleGoToMyBookings}>View My Bookings</button>
        <button onClick={handleGoToMyEvents}>View My Events</button>
        <button onClick={handleGoToAdminevent}>View Admin Events</button>
        <button onClick={handleGoToAdminUser}>View Admin Users</button>
        
    </div>
  );
}

export default Dashboard;
