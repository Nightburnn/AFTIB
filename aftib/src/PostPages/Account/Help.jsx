import React from 'react';
import { Link } from 'react-router-dom';
import './Help.css';

const Help = () => {
  return (
    <div className="help-section">
      <div className="row help-row">
        <div className="col-md-4">
          <Link to="/agent" className="help-link">How to become an agent</Link>
        </div>
        <div className="col-md-4 help-top">
          <Link to="/settings" className="help-link">How to switch account type</Link>
        </div>
        <div className="col-md-4 help-top">
          <Link to="/contact" className="help-link">How do I contact listing agents</Link>
        </div>
      </div>
      <div className="row help-row">
        <div className="col-md-4">
          <Link to="/create-account" className="help-link">How to create an account</Link>
        </div>
        <div className="col-md-4 help-top">
          <Link to="/reset-password" className="help-link">How to reset password</Link>
        </div>
        <div className="col-md-4 help-top">
          <Link to="/update-profile" className="help-link">How do I update my profile</Link>
        </div>
      </div>
      <div className="row help-row">
        <div className="col-md-4">
          <Link to="/change-email" className="help-link">How to change my email</Link>
        </div>
        <div className="col-md-4 help-top">
          <Link to="/search-properties" className="help-link">How do I search properties</Link>
        </div>
        <div className="col-md-4 help-top">
          <Link to="/change-number" className="help-link">How do I change my number</Link>
        </div>
      </div>
      <div className="row help-row">
        <div className="col-md-4">
          <Link to="/sell-properties" className="help-link">How do I sell my properties</Link>
        </div>
        <div className="col-md-4 help-top">
          <Link to="/pay-rent" className="help-link">How do I pay for rent</Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
