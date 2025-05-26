import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/dashboard.css';

function Navbar({ showLogoutOnly }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    logout();  // Clear auth info
    localStorage.removeItem("token");
    localStorage.removeItem("role");  
    navigate('/login');    // Redirect to login
  };

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
    // Update main content width
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.toggle('with-navbar');
    }
  };

  if (showLogoutOnly) {
    return (
      <div style={{ padding: '1rem' }}>
        <button className="dashboard-button" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  const { user } = useAuth();

  return (
    <>
      <button 
        className={`toggle-nav ${isExpanded ? 'expanded' : ''}`}
        onClick={toggleNav}
        aria-label="Toggle navigation"
      >
        {isExpanded ? '←' : '→'}
      </button>
      <nav className={`side-navbar ${isExpanded ? 'expanded' : ''}`}>
        <h1>Eicket</h1>
        <ul>
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/">All Events</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/user-bookings">My Bookings</Link></li>
              {user.role === 'organizer' && <li><Link to="/my-events">My Events</Link></li>}
              {user.role === 'admin' && (
                <>
                  <li><Link to="/admin/events">Admin Events</Link></li>
                  <li><Link to="/admin/users">Admin Users</Link></li>
                </>
              )}
              <li><button onClick={handleLogout} className="nav-button">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
