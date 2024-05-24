import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="container-fluid fadeIn">
  
        <div className="row m-2">
          <div className="col d-flex flex-column flex-md-row align-items-center ">
            <h3 className="footerLogo mb-3 mb-md-0">AFTIB</h3>
            <div className="socials d-flex">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-4 ">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-4 ">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-4 ">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-4 ">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
     
    </footer>
  );
};

export default Footer;
