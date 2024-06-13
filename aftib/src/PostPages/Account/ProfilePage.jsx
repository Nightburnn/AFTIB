import React, { useState } from 'react';
import './ProfilePage.css';
import { FaPowerOff, FaWrench } from 'react-icons/fa';
import { BsPersonFill } from "react-icons/bs";
import { FaEnvelopesBulk } from "react-icons/fa6";
import { MdHelp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import profile from '../../assets/images/profile.png';
import User from './User';
import Setting from './Setting';
import AgentSetting from '../AgentPage/Setting';
import AgentUser from '../AgentPage/User';
import Agent from './Agent';
import Help from './Help';
import { useAuth } from '../../AuthContext';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('user');
  const { user, logout } = useAuth();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to render components based on account type
  const renderBasedOnAccountType = () => {
    if (user) {
      switch (user.accountType) {
        case 'Client':
          return (
            <>
              {activeTab === 'user' && <User />}
              {activeTab === 'settings' && <Setting />}
              {activeTab === 'help' && <Help />}
            </>
          );
        case 'Agent':
          return (
            <>
            {activeTab === 'user' && <AgentUser />}
              {activeTab === 'agent' && <Agent />}
              {activeTab === 'settings' && <AgentSetting />}
              {activeTab === 'help' && <Help />}
            </>
          );
        // Add cases for other account types if needed
        default:
          return null;
      }
    }
    return null; // Render nothing if user is not authenticated
  };

  return (
    <div className="container mt-3 mb-5">
      <div className="row">
        <div className="profile-container">
          {user && (
            <div className="profile-details">
              <div className="profile-picture">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" />
                ) : (
                  <img src={profile} alt="Default Profile" />
                )}
              </div>
              <div className="profile-info">
                <h2>{user.name}</h2>
              </div>
            </div>
          )}
          {user && (
            <div className="logout-option">
              <Link onClick={logout}>
                <FaPowerOff className="power-off-icon"/> 
                Logout
              </Link>
            </div>
          )}
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container profileNav">
            <div className="d-flex flex-grow-1 justify-content-end align-items-center" id="navbarSupportedContent">
              <ul className="navbar-nav justify-content-between w-100 desktop-menu">
                <li className={`nav-item ${activeTab === 'user' ? 'active' : ''}`}>
                  <a className="nav-link" href="#user" onClick={() => handleTabChange('user')}>
                    <BsPersonFill className='icon'/>User
                  </a>
                </li>
                <li className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}>
                  <a className="nav-link" href="#settings" onClick={() => handleTabChange('settings')}>
                    <FaWrench className='icon'/>Settings
                  </a>
                </li>
                <li className={`nav-item ${activeTab === 'agent' ? 'active' : ''}`}>
                  <a className="nav-link" href="#agent" onClick={() => handleTabChange('agent')}>
                    <FaEnvelopesBulk className='icon'/>Your Agent
                  </a>
                </li>
                <li className={`nav-item ${activeTab === 'help' ? 'active' : ''}`}>
                  <a className="nav-link" href="#help" onClick={() => handleTabChange('help')}>
                    <MdHelp className='icon'/>Help
                  </a>
                </li>
              </ul>
              <select className="mobile-dropdown" value={activeTab} onChange={(e) => handleTabChange(e.target.value)}>
                <option value="user">User</option>
                <option value="settings">Settings</option>
                <option value="agent">Your Agent</option>
                <option value="help">Help</option>
              </select>
            </div>
          </div>
        </nav>

        <div className="profile-content">
          {renderBasedOnAccountType()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
