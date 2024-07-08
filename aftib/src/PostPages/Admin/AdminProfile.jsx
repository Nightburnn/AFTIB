// AgentUser.js
import React, { useState, useEffect } from "react";
import { updateUser, checkSession } from '../../utils/adminOpsRequests'; 
import "../Account/User.css";
import { useAuth } from "../../AuthContext";

const specialties = [
  "Buyers Agent",
  "Consulting",
  "Insurance",
  "Vacation",
  "Staging",
  "Relocation",
  "Moving",
  "Listing Agent",
  "Property Management",
  "Other",
];

const AdminProfile = () => {
  const { user, login, token } = useAuth(); 
  const [userProfile, setUserProfile] = useState(user || {});
  const [sessionValid, setSessionValid] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const isValid = await checkSession();
      setSessionValid(isValid);
    };

    validateSession();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      specialties: {
        ...prevProfile.specialties,
        [name]: checked,
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(userProfile, token);
      console.log("User updated successfully:", updatedUser);
      login(updatedUser); // Update the user in the Auth context
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!sessionValid) {
    return <div>Session expired. Please log in again.</div>;
  }

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
              value={userProfile.name || ""}
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
              value={userProfile.email || ""}
              onChange={handleChange}
              disabled
            />
          </div>
         
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder="Phone Number"
              value={userProfile.mobileNumber || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="form-control"
              value={userProfile.gender || ""}
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
              id="dob"
              value={userProfile.dob || ""}
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
              id="address"
              placeholder="Address"
              value={userProfile.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="landmark">Landmark</label>
            <input
              type="text"
              className="form-control"
              id="landmark"
              placeholder="Landmark"
              value={userProfile.landmark || ""}
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

export default AdminProfile;
