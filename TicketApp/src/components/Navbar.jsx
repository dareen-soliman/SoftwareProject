import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Navbar({ showLogoutOnly }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // Clear auth info
    navigate('/login');    // Redirect to login
  };

  if (showLogoutOnly) {
    return (
      <div style={{ padding: '1rem' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  const { user } = useAuth();

  return (
    <nav>
      <h1>Event App</h1>
      <ul>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {user.role === 'organizer' && <li><Link to="/my-events">My Events</Link></li>}
            {user.role === 'admin' && <li><Link to="/admin-events">Admin Panel</Link></li>}
            <li><Link to="/logout">Logout</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
