import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg'
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMobileNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <NavLink className="navbar-brand" to="/" onClick={handleNavLinkClick}>
           <img src={logo} alt="" />
          </NavLink>
          <button
            className={`navbar-toggler ${isNavOpen ? 'active' : ''}`}
            type="button"
            onClick={handleMobileNavClick}
          >
            <span className="navbar-toggler"><i className="bi bi-list"></i></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${isNavOpen ? 'show' : ''}`}
            id="navbarSupportedContent"
          >
            <div className="ml-auto d-flex flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink exact="true" className="nav-link" to="/" activeclassname="active"  onClick={handleNavLinkClick}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about" activeclassname="active"  onClick={handleNavLinkClick}>About us</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/buy" activeclassname="active"  onClick={handleNavLinkClick}>Buy</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sell" activeclassname="active"  onClick={handleNavLinkClick}>Sell</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/rent" activeclassname="active"  onClick={handleNavLinkClick}>Rent</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/agent-finder" activeclassname="active"  onClick={handleNavLinkClick}>Agent finder</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/help" activeclassname="active"  onClick={handleNavLinkClick}>Help</NavLink>
                </li>
                <li className=" ">
                <NavLink to="/sign"  onClick={handleNavLinkClick}>
                  <button className="sign-in">Sign in</button></NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
