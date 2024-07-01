import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import profile from "../../assets/images/profile.png";
import "./Header.css";
import { useAuth } from "../../AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();

  // Debugging logs
  console.log("Header Component Rendered");
  console.log("isLoggedIn:", isLoggedIn);
  console.log("user:", user);
  console.log("user.accountType:", user ? user.accountType : "No user");

  const handleMobileNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavLinkClick = () => {
    setIsNavOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleNavLinkClick();
  };

  useEffect(() => {
    const dropdowns = document.querySelectorAll(".dropdown-toggle");
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", function () {
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle("show");
      });
    });
  }, []);

  return (
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <NavLink className="navbar-brand" to="/" onClick={handleNavLinkClick}>
            <img src={logo} alt="" width={80} />
          </NavLink>
          <button
            className={`navbar-toggler ${isNavOpen ? "active" : ""}`}
            type="button"
            onClick={handleMobileNavClick}
          >
            <span className="navbar-toggler">
              <i className="bi bi-list"></i>
            </span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${isNavOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <div className="ml-auto d-flex flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    exact={true}
                    className="nav-link"
                    to="/"
                    activeClassName="active"
                    onClick={handleNavLinkClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    activeClassName="active"
                    onClick={handleNavLinkClick}
                  >
                    About us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/buy"
                    activeClassName="active"
                    onClick={handleNavLinkClick}
                  >
                    Buy
                  </NavLink>
                </li>
                {isLoggedIn && user && user.accountType === "Agent" ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/list"
                        activeClassName="active"
                        onClick={handleNavLinkClick}
                      >
                        Listing
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/inbox"
                        activeClassName="active"
                        onClick={handleNavLinkClick}
                      >
                        Inbox
                      </NavLink>
                    </li>
                  </>
                ) : isLoggedIn && user && user.accountType === "admin" ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/admin-dashboard"
                        activeClassName="active"
                        onClick={handleNavLinkClick}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/inbox"
                        activeClassName="active"
                        onClick={handleNavLinkClick}
                      >
                        Inbox
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/sell"
                        activeClassName="active"
                        onClick={handleNavLinkClick}
                      >
                        Sell
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/rent"
                        activeClassName="active"
                        onClick={handleNavLinkClick}
                      >
                        Rent
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/short"
                        activeClassName="active"
                        onClick={handleNavLinkClick}
                      >
                        Short Let
                      </NavLink>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={
                      isLoggedIn && user && user.accountType === "Agent"
                        ? "/agent-dashboard"
                        : "/agent-finder"
                    }
                    activeClassName="active"
                    onClick={handleNavLinkClick}
                  >
                    {isLoggedIn && user && user.accountType === "Agent"
                      ? "Dashboard"
                      : "Agent Finder"}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/help"
                    activeClassName="active"
                    onClick={handleNavLinkClick}
                  >
                    Help
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                {isLoggedIn && user ? (
                  <li className="nav-item dropdown profile-dropdown-toggle">
                    <img
                      src={profile}
                      alt="Profile"
                      className="profile-image"
                    />
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.name} <IoMdArrowDropdown className="drop" />
                    </Link>
                    <ul className="dropdown-menu">
                      {user.accountType === "admin" ? (
                        <>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/admin-profile"
                              onClick={handleNavLinkClick}
                            >
                              Profile
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="admin-users"
                              onClick={handleNavLinkClick}
                            >
                              Manage User
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/admin-profile#settings"
                              onClick={handleNavLinkClick}
                            >
                              Settings
                            </NavLink>
                          </li>
                        </>
                      ) : user.accountType === "Agent" ? (
                        <>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/profile"
                              onClick={handleNavLinkClick}
                            >
                              Profile
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/agent-dashboard"
                              onClick={handleNavLinkClick}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/profile#settings"
                              onClick={handleNavLinkClick}
                            >
                              Settings
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/profile#help"
                              onClick={handleNavLinkClick}
                            >
                              Help
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/profile"
                              onClick={handleNavLinkClick}
                            >
                              Profile
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/User-dashboard"
                              onClick={handleNavLinkClick}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/profile#agent"
                              onClick={handleNavLinkClick}
                            >
                              Agent
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/profile#help"
                              onClick={handleNavLinkClick}
                            >
                              Help
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/profile#settings"
                              onClick={handleNavLinkClick}
                            >
                              Settings
                            </NavLink>
                          </li>
                        </>
                      )}
                      <div className="dropdown-divider"></div>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="">
                    <NavLink to="/login" onClick={handleNavLinkClick}>
                      <button className="sign-in">Sign In</button>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
