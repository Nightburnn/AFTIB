import React from 'react';
import './Setting.css';
import { Link } from 'react-router-dom';

const Setting = () => {
  return (
    <div className="settings-form-container">
      <form>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="accountType">Switch Account Type</label>
            <select id="accountType" className="form-control">
              <option defaultValue>Choose...</option>
              <option>Personal</option>
              <option>Business</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="changePassword">Change Password</label>
            <input type="password" className="form-control" id="changePassword" placeholder="New Password" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="language">Languages</label>
            <select id="language" className="form-control">
              <option defaultValue>Choose...</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="country">Country</label>
            <select id="country" className="form-control">
              <option defaultValue>Choose...</option>
              <option>USA</option>
              <option>Canada</option>
              <option>UK</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="state">State</label>
            <select id="state" className="form-control">
              <option defaultValue>Choose...</option>
              <option>California</option>
              <option>New York</option>
              <option>Texas</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="notification">Send Notification</label>
            <select id="notification" className="form-control">
              <option defaultValue>Choose...</option>
              <option>Email</option>
              <option>SMS</option>
              <option>Push Notification</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="location">See My Location</label>
            <select id="location" className="form-control">
              <option defaultValue>Choose...</option>
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
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

export default Setting;
