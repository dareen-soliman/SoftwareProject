// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/v1/users/profile");
        setUser(res.data); // should contain _id and role
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User ID: <strong>{user._id}</strong></p>
      <p>Role: <strong>{user.role}</strong></p>
    </div>
  );
}

export default Dashboard;
