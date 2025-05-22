import React from 'react';
import { useAuth } from '../context/AuthContext';
import UpdateProfileForm from './UpdateProfileForm';

const ProfilePage = () => {
  const { user } = useAuth();

  console.log("User in ProfilePage:", user);  // Debugging line

  if (!user) {
    return <p>User not found or not logged in.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {user.profilePicture && (
        <div>
          <img 
            src={user.profilePicture} 
            alt={`${user.firstName} ${user.lastName}`} 
            style={{ width: '150px', borderRadius: '8px' }} 
          />
        </div>
      )}

      <UpdateProfileForm user={user} onUpdate={() => { /* implement update logic if needed */ }} />
    </div>
  );
};

export default ProfilePage;
