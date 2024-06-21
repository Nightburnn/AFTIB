import React, { useState } from 'react';
import sell from '../../assets/images/sell.png'
import sell1 from '../../assets/images/sell1.png'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import './Sell.css'

const Sell = () => {
  const cards = [
    { title: 'Slider Card 1', text: 'This is a description for slider card 1.' },
    { title: 'Slider Card 2', text: 'This is a description for slider card 2.' },
    { title: 'Slider Card 3', text: 'This is a description for slider card 3.' },
    { title: 'Slider Card 4', text: 'This is a description for slider card 4.' },
    { title: 'Slider Card 5', text: 'This is a description for slider card 5.' },
    { title: 'Slider Card 6', text: 'This is a description for slider card 6.' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? Math.ceil(cards.length / 3) - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === Math.ceil(cards.length / 3) - 1 ? 0 : prevSlide + 1));
  };

  const renderCards = (cards) => {
    return cards.map((card, index) => (
      <div key={index} className="card m-2" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.text}</p>
        </div>
      </div>
    ));
  };


  return (
    <>

<section className=" text-white d-flex flex-column flex-md-row first-section">
        <div className="col-md-6">
          <h1>Selling homes creating comfort for families</h1>
          <p>Our agents have the experience to price, market, and sell your home for the best price possible, all for half the fee other brokerages often charge.</p>
        </div>
        <div className="">
          <img src={sell1} alt="Description" className="img-fluid" />
        </div>
      </section>



      <section className="text-center p-5 second-section">
        <h2 className='mb-4'>Why sell with Aftib</h2>
        <div className="row  justify-content-between">
          <div className="col-md-3 secondcard">
            <div className="card" >
            <div className="card-body">
              <h5 className="card-title">Expertise and<br/> Experience</h5>
              <p className="card-text">Our seasoned agents know the market inside out, ensuring you get the best deal swiftly.</p>
            </div>
          </div>
          </div>
          
          <div className="col-md-3 secondcard">
            <div className="card " >
            <div className="card-body">
              <h5 className="card-title">Personalized<br/> Service</h5>
              <p className="card-text">We offer tailored support throughout the selling process, making it seamless and stress-free for you.</p>
            </div>
          </div>
          </div>
          
          <div className="col-md-3 secondcard">
             <div className="card " >
            <div className="card-body">
              <h5 className="card-title">Comprehensive Marketing</h5>
              <p className="card-text">We use cutting-edge marketing strategies to maximize your property's visibility and attract serious buyers.</p>
            </div>
          </div>
          </div>
         
        </div>
      </section>

      <section className="p-5 third-section">
  <h2 className="text-start mb-2">View my listed properties</h2>
  <div className="carousel">
    <div className="carousel-inner d-flex justify-content-between">
      {renderCards(cards.slice(currentSlide * 3, currentSlide * 3 + 3))}
    </div>
    {currentSlide !== 0 && (
      <button className="carousel-control-prev" onClick={handlePrev} disabled={currentSlide === 0}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only"><FaArrowAltCircleLeft /></span>
      </button>
    )}
    {currentSlide !== Math.ceil(cards.length / 3) - 1 && (
      <button className="carousel-control-next" onClick={handleNext} disabled={currentSlide === Math.ceil(cards.length / 3) - 1}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only"><FaArrowAltCircleRight /></span>
      </button>
    )}
  </div>
</section>


      <section className="d-flex flex-column flex-md-row p-5">
        <div className="col-md-6">
          <h2>Title</h2>
          <p>This is a paragraph describing the content of the section.</p>
          <input type="text" className="form-control mb-2" placeholder="Enter text" />
          <button className="btn btn-primary">Next</button>
        </div>
        <div className="col-md-6">
          <img src="path/to/image.jpg" alt="Description" className="img-fluid" />
        </div>
      </section>


      <section className="d-flex flex-column flex-md-row p-5">
        <div className="col-md-6 order-md-2">
          <img src="path/to/image.jpg" alt="Description" className="img-fluid" />
        </div>
        <div className="col-md-6 order-md-1">
          <h2>Title</h2>
          <p>This is a paragraph describing the content of the section.</p>
          <button className="btn btn-primary">Click Here</button>
        </div>
      </section>

    <main id="mainSell">
      <div className="container">
        <div className="row">
          <div className="sell mt-5">
            <h5>Oops you don't have any properties yet</h5>
          <img src={sell} alt="" />
          <button>
            Exit
          </button>
          </div>
        </div>
      </div>
    </main>
    </>
   
  )
}

export default Sell