import React, { useState, useEffect } from "react";
import sell1 from "../../assets/images/sell1.png";
import sell3 from "../../assets/images/sell3.png";
import sh1 from "../../assets/images/sh1.png";
import sh2 from "../../assets/images/sh2.png";
import why1 from "../../assets/images/why1.png";
import why2 from "../../assets/images/why2.png";
import why3 from "../../assets/images/why3.png";
import sh3 from "../../assets/images/sh3.png";
import { Link } from "react-router-dom";



import "./Sell.css";
const Sell = () => {
 
 
 

  return (
    <>
      <section className="text-white d-flex flex-column flex-md-row first-section p-5">
        <div className="col-md-6">
          <h1>Selling homes creating comfort for families</h1>
          <p>
            Our agents have the experience to price, market, and sell your home
            for the best price possible, all for half the fee other brokerages
            often charge.
          </p>
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
                      <img
                        src={why1}
                        className="card-img-top mt-4"
                        alt="Card1"
                      />
                      <div className="card-body landingTopics">
                        <h5 className="card-title mb-4">
                          Expertise and
                          <br /> Experience
                        </h5>
                        <p className="card-text mb-4">
                          Our seasoned agents know the market inside out,
                          ensuring you get the best deal swiftly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <div className="card landingCard-item">
                      <img
                        src={why2}
                        className="card-img-top mt-4"
                        alt="Card2"
                      />
                      <div className="card-body landingTopics">
                        <h5 className="card-title mb-4">
                          Comprehensive <br /> Marketing
                        </h5>
                        <p className="card-text  mb-4">
                          We use cutting-edge marketing strategies to maximize
                          your property's visibility and attract serious buyers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <div className="card landingCard-item">
                      <img
                        src={why3}
                        className="card-img-top mt-4"
                        alt="Card3"
                      />
                      <div className="card-body landingTopics">
                        <h5 className="card-title mb-4">
                          Personalized
                          <br /> Service
                        </h5>
                        <p className="card-text  mb-4">
                          We offer tailored support throughout the selling
                          process, making it seamless and stress-free for you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      
        <section className="d-flex flex-column flex-md-row p-5 align-items-center fourth container">
          <div className="col-md-6 mb-3 mb-md-0">
            <h2>Ready to get started?</h2>
            <p className="mt-3">
            Navigate to our agent's profile to explore your selling options and receive expert guidance, answering all your questions.
            </p>
            <Link to="/agent-finder"><button className="btn mt-3" style={{ width: "200px" }}>
              Next
            </button>
            </Link>
            
          </div>
          <div className="col-md-6">
            <img
              src={sell3}
              alt="Description"
              className="img-fluid"
              width={400}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Sell;
