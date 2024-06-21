import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import Hero from '../../Components/Hero/Hero'
import landingCard1 from '../../assets/images/landingCard1.png'
import landingCard2 from '../../assets/images/landingCard2.png'
import landingCard3 from '../../assets/images/landingCard3.png'
import agent from '../../assets/images/agent.png'
import './Landing.css'
import { Link } from 'react-router-dom'




const Landing = () => {

  
  const [selectedOption, setSelectedOption] = useState('buy');
  const [dropdownSelections, setDropdownSelections] = useState({
    type: 'Type',
    bedroom: 'Bedroom',
    minPrice: 'Min-Price',
    maxPrice: 'Max-Price',
  });
  const [dropdowns, setDropdowns] = useState({
    type: false,
    bedroom: false,
    minPrice: false,
    maxPrice: false,
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleDropdownSelect = (dropdown, value) => {
    setDropdownSelections((prev) => ({
      ...prev,
      [dropdown]: value,
    }));
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: false,
    }));
  };

  const dropdownOptions = {
    type: ['House', 'Apartment', 'Condo'],
    bedroom: ['1 Bedroom', '2 Bedrooms', '3 Bedrooms'],
    minPrice: ['$500', '$1000', '$1500'],
    maxPrice: ['$2000', '$3000', '$4000'],
  };

  return ( 
    <>

    
       <Hero/>

       <section className="homecard mt-3">
  <div className="container">
    <div className="row">
      <div className="col">
        <h3 className="home-inner">Find your next home</h3>
        <div className="home-title">
          <div className="d-flex mb-1 options">
            {['buy', 'rent', 'sell', 'land'].map((option) => (
              <div
                key={option}
                className={`option ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            ))}
          </div>

          <form className="landing-form">
            <div className="input-group-wrapper d-flex align-items-center mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaLocationDot />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Location"
                  aria-label="Search"
                />
              </div>
              <button className="btn btn-primary find ms-2">Find a home</button>
            </div>

            <div className="d-flex flex-wrap dropdown-group">
              {['type', 'bedroom', 'minPrice', 'maxPrice'].map((dropdown) => (
                <div className="dropdown ms-2 mb-2" key={dropdown}>
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    onClick={() => toggleDropdown(dropdown)}
                  >
                    {dropdownSelections[dropdown]}
                  </button>
                  <div className={`dropdown-menu ${dropdowns[dropdown] ? 'show' : ''}`}>
                    {dropdownOptions[dropdown].map((option) => (
                      <Link
                        key={option}
                        className="dropdown-item"
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDropdownSelect(dropdown, option);
                        }}
                      >
                        {option}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>


   

    <section className="landingCard mt-5">
      <div className="container">
      <div className="row">
        <div className="col-lg-4 ">
          <div className="landingCard-item">
           <img src={landingCard1} alt="" />
           <div className="landingTopics">
            <h4>Buy a home</h4>

            <p>Find your place with immersive photos and exclusive listings.</p>

            <Link className='enter' to="buy">
           Buy
            </Link>
           </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="landingCard-item">
          <img src={landingCard2} alt="" />
          <div className="landingTopics">
            <h4>Sell a home</h4>

            <p>Find your place with immersive photos and exclusive listings.</p>
            <Link className='enter' to="/sell">
           Sell
            </Link>
           
           </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="landingCard-item">
          <img src={landingCard3} alt="" />
          <div className="landingTopics">
            <h4>Rent a home</h4>

            <p>Find your place with immersive photos and exclusive listings.</p>

            <Link className='enter' to="/rent">
           Rent
            </Link>
           </div>
          </div>
        </div>
      </div>
    </div>
      </section>

      <div className="landingcontact py-5">
            <div className="container">
                <div className="p-3">
                    <div className="  p-4 landingContact">
                        <div className="row g-5 align-items-center">
                        <div className="col-lg-6 ">
                                <div className="mb-4">
                                    <h1 className="mb-4">Discover your ideal<br/>property effortlessly</h1>
                                    <p>Get in touch with leading real estate agents<br/>and agencies</p>
                                </div>
                                <Link to="/agent-finder" className="landingicon">Find agents</Link>
                            </div>
                            <div className="col-lg-6">
                                <img className="img-fluid w-100" src={agent} alt=""/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Landing