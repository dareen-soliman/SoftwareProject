// src/pages/Nav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoToProfile = () => navigate("/profile");
  const handleGoToAllEvents = () => navigate("/");
  const handleGoToMyBookings = () => navigate("/user-bookings");
  const handleGoToMyEvents = () => navigate("/my-events");
  const handleGoToAdminEvent = () => navigate("/admin/events");
  const handleGoToAdminUser = () => navigate("/admin/users");

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h2 className="dashboard-title">Welcome to your dashboard!</h2>
        <p className="dashboard-subtitle">Manage your events and bookings from here</p>
          
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>View and edit your profile information</p>
            <button className="dashboard-button" onClick={handleGoToProfile}>Go to Profile</button>
          </div>

          <div className="dashboard-card">
            <h3>All Events</h3>
            <p>Browse all available events</p>
            <button className="dashboard-button" onClick={handleGoToAllEvents}>View All Events</button>
          </div>

          <div className="dashboard-card">
            <h3>My Bookings</h3>
            <p>View your event bookings</p>
            <button className="dashboard-button" onClick={handleGoToMyBookings}>View My Bookings</button>
          </div>

          {user?.role === 'organizer' && (
            <div className="dashboard-card">
              <h3>My Events</h3>
              <p>Manage your created events</p>
              <button className="dashboard-button" onClick={handleGoToMyEvents}>View My Events</button>
            </div>
          )}

          {user?.role === 'admin' && (
            <>
              <div className="dashboard-card">
                <h3>Admin Events</h3>
                <p>Manage all events</p>
                <button className="dashboard-button" onClick={handleGoToAdminEvent}>View Admin Events</button>
              </div>

              <div className="dashboard-card">
                <h3>Admin Users</h3>
                <p>Manage user accounts</p>
                <button className="dashboard-button" onClick={handleGoToAdminUser}>View Admin Users</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
