// UpdateProfileForm.jsx
import React, { useState } from 'react';
import api from "../services/api";

const UpdateProfileForm = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    age: user.age || '',
    profilePicture: user.profilePicture || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('First name, last name and email are required');
      return;
    }
    if (formData.age && (isNaN(formData.age) || formData.age < 0)) {
      setError('Age must be a positive number');
      return;
    }

    try {
      const res = await api.put('/v1/users/profile', formData);
      onUpdate(res.data.user);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />
      <input name="profilePicture" value={formData.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;
