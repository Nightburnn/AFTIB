import React from 'react';
import './User.css';
import { Link } from 'react-router-dom';

const User = () => {
  return (
    <div className="user-form-container">
    <form>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" className="form-control" id="fullName" placeholder="Full Name" />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Email" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" placeholder="Phone Number" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="gender">Gender</label>
          <select id="gender" className="form-control">
            <option defaultValue>Choose...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" className="form-control" id="dob" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-8">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" id="address" placeholder="Address" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="landmark">Landmark</label>
          <input type="text" className="form-control" id="landmark" placeholder="Landmark" />
        </div>
      </div>
      <div className="save">
        <Link>
        Save and Continue
        </Link>
      </div>
    </form>
  </div>
  );
};

export default User;
