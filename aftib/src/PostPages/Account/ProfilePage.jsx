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
import UserAgent from "./UserAgent";
import Client from '../AgentPage/Client';
import Help from './Help';
import { useAuth } from '../../AuthContext';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('user');
  const { user, logout } = useAuth();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

 

  const renderBasedOnAccountType = () => {
    if (user && user.accountType) {
      switch (user.accountType) {
        case 'Client':
          return (
            <>
              {activeTab === 'user' && <User />}
              {activeTab === 'settings' && <Setting />}
              {activeTab === 'agent' && <UserAgent />}
              {activeTab === 'help' && <Help />}
            </>
          );
        case 'Agent':
          return (
            <>
              {activeTab === 'user' && <AgentUser />}
              {activeTab === 'agent' && <Client />}
              {activeTab === 'settings' && <AgentSetting />}
              {activeTab === 'help' && <Help />}
            </>
          );
        case 'admin':
          return (
            <>
              {activeTab === 'user' && <AgentUser />} 
             
              {activeTab === 'settings' && <AgentSetting />} 
              {activeTab === 'help' && <Help />}
            </>
          );
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className="container mt-3 mb-5">
      <div className="row">
        <div className="profile-container">
          {user && (
            <div className="profile-details">
              <div className="profile-picture">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile"
                  />
                ) : (
                  <img src={profile} alt="Default Profile" 
                 />
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
                <FaPowerOff className="power-off-icon" />
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
                  <Link to="#user" className="nav-link" onClick={() => handleTabChange('user')}>
                    <BsPersonFill className='icon' />
                    {user && user.accountType === 'Agent' ? 'Agent' : user && user.accountType === 'Admin' ? 'Admin' : 'User'}
                  </Link>
                </li>
                <li className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}>
                  <Link className="nav-link" to="#settings" onClick={() => handleTabChange('settings')}>
                    <FaWrench className='icon' />
                    Settings
                  </Link>
                </li>
                <li className={`nav-item ${activeTab === 'agent' ? 'active' : ''}`}>
                  <Link className="nav-link" to="#agent" onClick={() => handleTabChange('agent')}>
                    <FaEnvelopesBulk className='icon' />
                    {user && user.accountType === 'Agent' ? 'Your Client' : user && user.accountType === 'Admin' ? 'Admin Settings' : 'Your Agent'}
                  </Link>
                </li>
                <li className={`nav-item ${activeTab === 'help' ? 'active' : ''}`}>
                  <Link className="nav-link" to="#help" onClick={() => handleTabChange('help')}>
                    <MdHelp className='icon' />
                    Help
                  </Link>
                </li>
              </ul>
              <select className="mobile-dropdown" value={activeTab} onChange={(e) => handleTabChange(e.target.value)}>
                <option value="user">{user && user.accountType === 'Agent' ? 'Agent' : user && user.accountType === 'admin' ? 'admin' : 'User'}</option>
                <option value="settings">Settings</option>
                <option value="agent">{user && user.accountType === 'Agent' ? 'Your Client' : user && user.accountType === 'admin' ? 'Admin Settings' : 'Your Agent'}</option>
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
