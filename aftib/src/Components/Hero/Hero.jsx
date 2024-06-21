import React from "react";
import "./Hero.css";
import about from '../../assets/images/about.png'



const Hero = () => {
  return (
    <div className="intro intro-carousel position-relative overflow-hidden">
      <div className="carousel-item-a intro-item">
        <img src={about} alt="Slide" className="intro-img" />
      
      </div>
    </div>
  );
};

export default Hero;
