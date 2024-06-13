import React, { useState } from 'react';
import '../Account/User.css';
import { useAuth } from '../../AuthContext';


const AgentUser = () => {
  const { user, login } = useAuth(); // Use useAuth hook to access user data and login function
  const [userProfile, setUserProfile] = useState(user || {}); // Initialize state with user from AuthContext

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  // Handle form submission (save changes)
  const handleSave = (e) => {
    e.preventDefault();
    // Simulate saving changes - you can replace this with actual API call
    console.log('Saving user profile:', userProfile);
    // Update userProfile state or send API request to save changes

    // Assuming you have an API call to update user profile, you can update user context
    // For simulation, update context directly
    login(userProfile);
  };

  // Check if user is null or undefined before accessing user.name
  if (!user) {
    return <div>Loading...</div>; // Replace with your loading indicator or logic
  }

  return (
    <div className="user-form-container">
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name" // Assuming 'name' matches the key in user profile
              placeholder="Full Name"
              value={userProfile.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email" // Assuming 'email' matches the key in user profile
              placeholder="Email"
              value={userProfile.email || ''}
              onChange={handleChange}
              disabled // Assuming email should not be editable in this form
            />
          </div>


          <div className="form-group col-md-4">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="form-control"
              value={userProfile.profession}
              onChange={handleChange}
            >
              <option value="real">Real Estate Agent</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber" // Assuming 'phoneNumber' matches the key in user profile
              placeholder="Phone Number"
              value={userProfile.mobileNumber || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender" // Assuming 'gender' matches the key in user profile
              className="form-control"
              value={userProfile.gender || ''}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob" // Assuming 'dob' matches the key in user profile
              value={userProfile.dob || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-8">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address" // Assuming 'address' matches the key in user profile
              placeholder="Address"
              value={userProfile.address || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="landmark">Landmark</label>
            <input
              type="text"
              className="form-control"
              id="landmark" // Assuming 'landmark' matches the key in user profile
              placeholder="Landmark"
              value={userProfile.landmark || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
        <div className="form-group col-md-4">
            <label htmlFor="landmark">Real Estate Agent License</label>
            <input
              type="text"
              className="form-control"
              id="landmark" // Assuming 'landmark' matches the key in user profile
              placeholder="Landmark"
              value={userProfile.landmark || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="address">License Number</label>
            <input
              type="text"
              className="form-control"
              id="address" // Assuming 'address' matches the key in user profile
              placeholder="Address"
              value={userProfile.address || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="save">
          <button type="submit" className="btn btn-primary">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentUser;
