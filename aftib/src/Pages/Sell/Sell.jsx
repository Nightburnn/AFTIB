import React, { useState, useEffect } from 'react';
import sell from '../../assets/images/sell.png';
import sell1 from '../../assets/images/sell1.png';
import sell3 from '../../assets/images/sell3.png';
import sh1 from '../../assets/images/sh1.png';
import sh2 from '../../assets/images/sh2.png';
import why1 from '../../assets/images/why1.png';
import why2 from '../../assets/images/why2.png';
import why3 from '../../assets/images/why3.png';
import sh3 from '../../assets/images/sh3.png';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Sell.css';

const Sell = () => {
  const cards = [
    { title: 'Slider Card 1', text: 'This is a description for slider card 1.', image: sh1 },
    { title: 'Slider Card 2', text: 'This is a description for slider card 2.', image: sh2 },
    { title: 'Slider Card 3', text: 'This is a description for slider card 3.', image: sh3 },
    { title: 'Slider Card 4', text: 'This is a description for slider card 4.', image: sh3 },
    { title: 'Slider Card 5', text: 'This is a description for slider card 5.', image: sh1 },
    { title: 'Slider Card 6', text: 'This is a description for slider card 6.', image: sh2 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(window.innerWidth <= 768 ? 1 : 3);
  const [hasProperties, setHasProperties] = useState(false); // Dummy state to check if there are properties

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth <= 768 ? 1 : 3);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const maxSlideIndex = Math.ceil(cards.length / slidesToShow) - 1;

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? maxSlideIndex : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === maxSlideIndex ? 0 : prevSlide + 1));
  };

  const renderCards = () => {
    return cards.slice(currentSlide * slidesToShow, currentSlide * slidesToShow + slidesToShow).map((card, index) => (
      <div key={index} className="card m-2 view" style={{ width: '18rem' }}>
        <img src={card.image} className="card-img-top" alt={card.title} />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.text}</p>
          <button className="btn">Learn More</button>
        </div>
      </div>
    ));
  };

  return (
    <>
   <section className="text-white d-flex flex-column flex-md-row first-section p-5">
        <div className="col-md-6">
          <h1>Selling homes creating comfort for families</h1>
          <p>Our agents have the experience to price, market, and sell your home for the best price possible, all for half the fee other brokerages often charge.</p>
        </div>
        <div className="col-md-6">
          <img src={sell1} alt="Description" className="img-fluid" />
        </div>
      </section>

      
      <div className="">
      <section className="landingCard mt-3">
  <div className="container-fluid">
    <div className="">
      <div className="row">
        <h4 className="mb-3 ps-4">Why sell on Aftib</h4>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card landingCard-item">
              <img src={why1} className="card-img-top mt-4" alt="Card1" />
              <div className="card-body landingTopics">
                <h5 className="card-title mb-4">Expertise and<br/> Experience</h5>
                <p className="card-text mb-4">Our seasoned agents know the market inside out, ensuring you get the best deal swiftly.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card landingCard-item">
              <img src={why2} className="card-img-top mt-4" alt="Card2" />
              <div className="card-body landingTopics">
                <h5 className="card-title mb-4">Comprehensive <br/> Marketing</h5>
                <p className="card-text  mb-4">We use cutting-edge marketing strategies to maximize your property's visibility and attract serious buyers.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card landingCard-item">
              <img src={why3} className="card-img-top mt-4" alt="Card3" />
              <div className="card-body landingTopics">
                <h5 className="card-title mb-4">Personalized<br/> Service</h5>
                <p className="card-text  mb-4">We offer tailored support throughout the selling process, making it seamless and stress-free for you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {hasProperties ? (
          <section className="p-5 third-section">
            <h2 className="text-start mb-2">View my listed properties</h2>
            <div className="carousel-wrapper">
              <button className="carousel-control-prev" onClick={handlePrev} disabled={currentSlide === 0}>
                <FaArrowAltCircleLeft className='arrow'/>
              </button>
              <div className="carousel">
                <div className="carousel-inner">
                  {renderCards()}
                </div>
              </div>
              <button className="carousel-control-next" onClick={handleNext} disabled={currentSlide === maxSlideIndex}>
                <FaArrowAltCircleRight className='arrow'/>
              </button>
            </div>
          </section>
        ) : (
          <main id="mainSell" className="p-5">
            <div className="container">
              <div className="row">
                <div className="sell mt-5 text-center">
                  <h5>Oops you don't have any properties yet</h5>
                  <img src={sell} alt="No properties" className="img-fluid" />
                </div>
              </div>
            </div>
          </main>
        )}

        <section className="d-flex flex-column flex-md-row p-5 align-items-center fourth">
          <div className="col-md-6 mb-3 mb-md-0">
            <h2>Ready to get started?</h2>
            <p className="mt-3">We can connect you with an agent today who will help you understand your options for selling and answer all your questions.</p>
            <button className="btn mt-3" style={{ width: '200px' }}>Next</button>
          </div>
          <div className="col-md-6">
            <img src={sell3} alt="Description" className="img-fluid" width={400} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Sell;
