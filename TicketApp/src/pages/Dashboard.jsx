// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name || 'User'}!</p>
      <p>Your role: {user?.role}</p>
    </div>
  );
}

export default Dashboard;
