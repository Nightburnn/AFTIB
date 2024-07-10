// AgentUser.js
import React, { useContext, useEffect } from "react";
import "../Account/User.css";
import { useAuth } from "../../AuthContext";
import { UserContext } from "./UserContext"; // Adjust the import path as needed
import { updateUser } from "../../utils/adminOpsRequests"; // Adjust the import path as needed

const AgentUser = () => {
  const { user, token } = useAuth();
  const { userUpdateObject, setUserUpdateObject } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserUpdateObject((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
      }));
    }
  }, [user, setUserUpdateObject]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserUpdateObject((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(userUpdateObject, token);
      console.log("User profile updated successfully:", updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              value={userUpdateObject.name}
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
              value={userUpdateObject.email}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="form-control"
              value={userUpdateObject.gender}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group col-md4">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              placeholder="Mobile Number"
              value={userUpdateObject.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              value={userUpdateObject.dateOfBirth}
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
              value={userUpdateObject.address}
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
