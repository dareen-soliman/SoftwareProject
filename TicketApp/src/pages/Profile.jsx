import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    profilePicture: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/v1/users/profile");
        setUser(res.data);
        setFormData({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          email: res.data.email || "",
          age: res.data.age || "",
          profilePicture: res.data.profilePicture || ""
        });
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/v1/users/profile", formData);
      setUser(res.data.user);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      setError(msg);
      setSuccess("");
    }
  };

  if (error && !user) return <p>{error}</p>;
  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
      {/* Read-only Profile Section */}
      <h1>Profile</h1>
      <p><strong>User ID:</strong> {user._id}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
      {user.profilePicture && (
        <p>
          <strong>Profile Picture:</strong><br />
          <img src={user.profilePicture} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "8px" }} />
        </p>
      )}

      {/* Editable Form Section */}
      <hr />
      <h2>Edit Your Profile</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleUpdate}>
        <label>First Name:</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Last Name:</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Age:</label>
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />

        <label>Profile Picture URL:</label>
        <input
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
        />

        <br /><br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
