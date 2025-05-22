import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/v1/users/profile");
        setUser(res.data);
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
      <h1>Profile</h1>
      <p><strong>User ID:</strong> {user._id}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
    </div>
  );
}

export default Profile;
