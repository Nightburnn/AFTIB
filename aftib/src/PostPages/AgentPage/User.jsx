// AgentUser.js
import React, { useContext, useState } from "react";
import { updateUser } from "../../utils/adminOpsRequests"; // Adjust the import path as needed
import { useAuth } from "../../AuthContext";
import { UserContext } from "./UserContext"; // Adjust the import path as needed

import "../Account/User.css";

const AgentUser = () => {
  const { user, login, token } = useAuth();
  const { userUpdateObject, setUserUpdateObject } = useContext(UserContext);

  const [userProfile, setUserProfile] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    mobileNumber: user ? user.mobileNumber : "",
    gender: user ? user.gender : "",
    dateOfBirth: user ? user.dateOfBirth : new Date(),
    address: user ? user.address : "",
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

    // Update the user update object in the context
    setUserUpdateObject((prev) => ({
      ...prev,
      name: userProfile.name,
      email: userProfile.email,
      mobileNumber: userProfile.mobileNumber,
      gender: userProfile.gender,
      dateOfBirth: userProfile.dateOfBirth,
      address: userProfile.address,
    }));

    try {
      const updatedUser = await updateUser(userUpdateObject, token);
      console.log("User updated successfully:", updatedUser);
      login(updatedUser); // Update the user in the Auth context
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group col-md-4">
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
          <div className="form-group col-md-4">
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
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              placeholder="Mobile Number"
              value={userProfile.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
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
          <button type="submit" className="btn blue">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentUser;
