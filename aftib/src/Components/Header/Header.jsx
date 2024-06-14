import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import profile from '../../assets/images/profile.png';
import "./Header.css";
import { useAuth } from "../../AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth(); 
  console.log("User:", user);
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
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', function() {
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle('show');
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
            className={`collapse navbar-collapse justify-content-end ${
              isNavOpen ? "show" : ""
            }`}
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
                    to="/agent-finder"
                    activeClassName="active"
                    onClick={handleNavLinkClick}
                  >
                    Agent finder
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
                {isLoggedIn && user && ( 
                  <li className="nav-item dropdown profile-dropdown-toggle ">
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
                          to="/profile#settings"
                          onClick={handleNavLinkClick}
                        >
                          Settings
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
                )}
                {!isLoggedIn && (
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
