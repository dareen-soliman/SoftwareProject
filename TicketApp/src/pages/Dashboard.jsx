// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome, <strong>{user?.name || 'User'}</strong>!</p>
      <p><strong>Role:</strong> {user?.role || 'Not specified'}</p>

      <h3>Your Profile</h3>
      <p>Email: {user?.email || 'Not available'}</p>

      <p>
        Want to update your profile?{' '}
        <Link to="/profile">Go to Profile Page</Link>
      </p>
    </div>
  );
}

export default Dashboard;
