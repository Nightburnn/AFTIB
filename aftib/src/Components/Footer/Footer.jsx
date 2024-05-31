import React from 'react';
import './Footer.css'; 
import logo from '../../assets/images/logo.svg'


const Footer = () => {
  return (
    <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
         
          <div className="copyright-footer">
          
              <img src={logo} alt="" />
              
        
          </div>
          
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
