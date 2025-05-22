// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const { id } = useParams(); // Get user ID from URL
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await api.get(`/v1/users/${id}`);
        setUserDetails(res.data);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchUserDetails();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!userDetails) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>ID:</strong> {userDetails._id}</p>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Age:</strong> {userDetails.age}</p>
      <p><strong>Role:</strong> {userDetails.role}</p>
    </div>
  );
}

export default Profile;
