import React, { useState } from "react";
import "./ProfilePage.css";
import { FaPowerOff, FaWrench } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import profileavatar from "../../assets/images/profileavatar.jpg";
import User from "./User";
import Setting from "./Setting";
import AgentSetting from "../AgentPage/Setting";
import AgentUser from "../AgentPage/User";
import { useAuth } from "../../AuthContext";
import AdminProfile from "../Admin/AdminProfile";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("user");
  const { user, logout } = useAuth();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderBasedOnAccountType = () => {
    if (user && user.accountType) {
      switch (user.accountType) {
        case "client":
          return (
            <>
              {activeTab === "user" && <User />}
              {activeTab === "settings" && <Setting />}
            </>
          );
        case "agent":
          return (
            <>
              {activeTab === "user" && <AgentUser />}
              {activeTab === "settings" && <AgentSetting />}
            </>
          );
        case "admin":
          return (
            <>
              {activeTab === "user" && <AdminProfile />}
              {activeTab === "settings" && <AgentSetting />}
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
                  <img src={user.profilePicture} alt="Profile" />
                ) : (
                  <img src={profileavatar} alt="Default Profile" />
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
            <div
              className="d-flex flex-grow-1 justify-content-end align-items-center"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav justify-content-between w-100 desktop-menu">
                <li
                  className={`nav-item ${activeTab === "user" ? "active" : ""}`}
                >
                  <Link
                    to="#user"
                    className="nav-link"
                    onClick={() => handleTabChange("user")}
                  >
                    <BsPersonFill className="icon" />
                    {user && user.accountType === "agent"
                      ? "Agent"
                      : user && user.accountType === "admin"
                        ? "Admin"
                        : "User"}
                  </Link>
                </li>
                <li
                  className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
                >
                  <Link
                    className="nav-link"
                    to="#settings"
                    onClick={() => handleTabChange("settings")}
                  >
                    <FaWrench className="icon" />
                    Settings
                  </Link>
                </li>
              </ul>
              <select
                className="mobile-dropdown"
                value={activeTab}
                onChange={(e) => handleTabChange(e.target.value)}
              >
                <option value="user">
                  {user && user.accountType === "agent"
                    ? "Agent"
                    : user && user.accountType === "admin"
                      ? "Admin"
                      : "User"}
                </option>
                <option value="settings">Settings</option>
              </select>
            </div>
          </div>
        </nav>
        <div className="profile-content">{renderBasedOnAccountType()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
