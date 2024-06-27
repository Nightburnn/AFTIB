import React, { useState } from 'react';
import '../Account/User.css';
import { useAuth } from '../../AuthContext';

const specialties = [
  'Buyers Agent', 'Consulting', 'Insurance', 'Vacation', 'Staging',
  'Relocation', 'Moving', 'Listing Agent', 'Property Management', 'Other'
];

const AgentUser = () => {
  const { user, login } = useAuth();
  const [userProfile, setUserProfile] = useState(user || {});

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

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saving user profile:', userProfile);
    login(userProfile);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
              value={userProfile.name || ''}
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
              value={userProfile.email || ''}
              onChange={handleChange}
              disabled
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
              id="phoneNumber"
              placeholder="Phone Number"
              value={userProfile.mobileNumber || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
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
              id="dob"
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
              id="address"
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
              id="landmark"
              placeholder="Landmark"
              value={userProfile.landmark || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="license">Real Estate Agent License</label>
            <input
              type="text"
              className="form-control"
              id="license"
              placeholder="License"
              value={userProfile.license || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="licenseNumber">License Number</label>
            <input
              type="text"
              className="form-control"
              id="licenseNumber"
              placeholder="License Number"
              value={userProfile.licenseNumber || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="expdate">License Expiration Date</label>
            <input
              type="date"
              className="form-control"
              id="expdate"
              value={userProfile.expdate || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12 ">
            <label>Agent Specialties</label>
            <div className="specialties-grid mt-2">
              {specialties.map((specialty, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={specialty}
                    id={specialty}
                    checked={userProfile.specialties?.[specialty] || false}
                    onChange={handleCheckboxChange}
                  />
                  <span className="form-check-label checkLabel" htmlFor={specialty}>
                    {specialty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12 d-flex align-items-center">
            <label htmlFor="facebook" className="col-form-label me-4">Facebook</label>
            <input
              type="text"
              className="form-control"
              id="facebook"
              placeholder="Facebook Account"
              value={userProfile.facebook || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12 d-flex align-items-center">
            <label htmlFor="instagram" className="col-form-label me-4">Instagram</label>
            <input
              type="text"
              className="form-control"
              id="instagram"
              placeholder="Instagram Account"
              value={userProfile.instagram || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12 d-flex align-items-center">
            <label htmlFor="twitter" className="col-form-label me-5">Twitter</label>
            <input
              type="text"
              className="form-control"
              id="twitter"
              placeholder="Twitter Account"
              value={userProfile.twitter || ''}
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
