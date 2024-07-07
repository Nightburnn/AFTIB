import React, { useState } from "react";
import "./User.css";
import { useAuth } from "../../AuthContext";
import { updateUser } from "../../utils/adminOpsRequests";

const User = () => {
  const { user, login, token } = useAuth();
  const [userProfile, setUserProfile] = useState({
    name: user.name || "",
    email: user.email || "",
    mobileNumber: user.mobileNumber || "",
    gender: user.gender || "",
    dateOfBirth: user.dateOfBirth || new Date().toISOString().split('T')[0], // Ensure it's in the correct format
    address: user.address || "",
    password: "", // Leave empty if not changing the password
    country: user.country || "",
    language: user.language || "English",
    state: user.state || ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Saving user profile:", userProfile);
    try {
      const updatedUserData = await updateUser(userProfile, token);
      console.log("User updated successfully:", updatedUserData);
      login(updatedUserData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-form-container">
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Full Name"
              value={userProfile.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={userProfile.email}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="mobileNumber">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              placeholder="Phone Number"
              value={userProfile.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="form-control"
              value={userProfile.gender}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              value={userProfile.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Address"
              value={userProfile.address}
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

export default User;
