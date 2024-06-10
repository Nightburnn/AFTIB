import React from 'react';
import './ProfilePage.css'; 
import { useAuth } from '../../AuthContext';
import { FaPowerOff } from 'react-icons/fa'; // Import the power icon

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-picture">
          {/* Display user's profile picture or a default picture */}
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" />
          ) : (
            <img src="/default-profile-picture.jpg" alt="Default Profile" />
          )}
        </div>
        <div className="profile-info">
          {/* Display user's name */}
          <h2>{user.name}</h2>
          {/* You can add more user information here */}
        </div>
      </div>
      <div className="logout-option">
        {/* Logout option with power icon */}
        <button onClick={handleLogout}>
          <FaPowerOff />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
