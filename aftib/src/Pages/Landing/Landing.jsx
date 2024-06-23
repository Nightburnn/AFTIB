import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import Hero from '../../Components/Hero/Hero';
import landingCard1 from '../../assets/images/landingCard1.png';
import landingCard2 from '../../assets/images/landingCard2.png';
import landingCard3 from '../../assets/images/landingCard3.png';
import exp1 from '../../assets/images/exp1.png';
import exp2 from '../../assets/images/exp2.png';
import exp3 from '../../assets/images/exp3.png';
import sel1 from '../../assets/images/sel1.png';
import sel2 from '../../assets/images/sel2.png';
import sel3 from '../../assets/images/sel3.png';
import agent from '../../assets/images/agent.png';
import { LuMoveRight } from "react-icons/lu";
import './Landing.css';
import { Link } from 'react-router-dom';

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
    type: ['House', 'Apartment', 'Condo', 'Land', 'House', 'Apartment', 'Condo', 'Land'],
    bedroom: ['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5 Bedrooms', '6 Bedrooms', '7 Bedroom', '8 Bedrooms', '9 Bedrooms', '10 Bedrooms'],
    minPrice: ['50,000', '100,000', '200,000', '300,000', '400,000', '500,000', '600,000', '700,000', '800,000', '900,000', '1 million', '2 million',  '3 million'],
    maxPrice: ['500,000', '600,000', '700,000', '800,000', '900,000',  '1 million', '2 million', '3 million', '4 million', '5 million', '10 million', '15 million'],
  };

  return (
    <>
      <Hero />

      <section className="homecard mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="home-inner mt-3">Find your next home</h3>
              <div className="home-title">
                <div className="d-flex mb-1 options">
                  {['buy', 'rent', 'Shortlet', 'hotel'].map((option) => (
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

      <div className="container exp">
      <h1 className="text-start">Explore homes on Aftib</h1>
      <p className="text-muted">Explore homes for sale, authentic neighborhood photos, resident reviews, and local insights to discover the perfect fit for you.</p>
      
      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <div className="card ">
            <img src={exp1} className="card-img-top" alt="Card1" />
            <div className="card-body">
              <h5 className="card-title">Lagos</h5>
              <p className="card-text">Explore Lagos, where vibrant city life meets luxurious
 waterfront living in neighborhoods like Victoria Island 
and Ikoyi.</p>
              <Link href="#" className="text">
                Take a look <span className="ms-2"><LuMoveRight className='text' /></span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card ">
            <img src={exp2} className="card-img-top" alt="Card2" />
            <div className="card-body">
              <h5 className="card-title">Abuja</h5>
              <p className="card-text">Discover Abuja, Nigeria's capital, known for its tranquil 
elegance and upscale residences in areas like Asokoro 
and Maitama.</p>
              <Link href="#" className="text">
                Take a look <span className="ms-2"><LuMoveRight className='text'/></span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card ">
            <img src={exp3} className="card-img-top" alt="Card3" />
            <div className="card-body">
              <h5 className="card-title">Port Harcourt</h5>
              <p className="card-text">Experience Port Harcourt's coastal charm and exclusive 
estates, offering serene luxury in neighborhoods like 
GRA Phase 3 and Peter Odili Road.</p>
              <Link href="#" className="text">
                Take a look <span className="ms-2"><LuMoveRight className='text'/></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="container sel">
      <h1 className="text-start">Select Category</h1>
      <p className="text-muted">Explore diverse properties tailored to your needs: Find your perfect match with us today.</p>

      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <div className="image-container">
            <img src={sel1} className="img-fluid" alt="sell" />
            <div className="image-text">
              <h5 className="text-start">Urban</h5>
              <Link href="#" className="text">
                Take a look <span className="ms-2"><LuMoveRight className='text'/></span>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="image-container">
            <img src={sel2} className="img-fluid" alt="sell" />
            <div className="image-text">
              <h5 className="text-start">Rural</h5>
              <Link href="#" className="text">
                Take a look <span className="ms-2"><LuMoveRight className='text'/></span>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="image-container">
            <img src={sel3} className="img-fluid" alt="sell" />
            <div className="image-text">
              <h5 className="text-start">Developing<br/>Areas</h5>
              <Link href="#" className="text">
                Take a look <span className="ms-2"><LuMoveRight className='text'/></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

      <section className="landingCard mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
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
            <div className="p-4 landingContact">
              <div className="row g-5 align-items-center">
                <div className="col-lg-6">
                  <div className="mb-4">
                    <h1 className="mb-4">Discover your ideal<br />property effortlessly</h1>
                    <p>Get in touch with leading real estate agents<br />and agencies</p>
                  </div>
                  <Link to="/agent-finder" className="landingicon">Find agents</Link>
                </div>
                <div className="col-lg-6">
                  <img className="img-fluid w-100" src={agent} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
