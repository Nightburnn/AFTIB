import React from "react";
import agent from "../../assets/images/agent.png";
import { Link } from "react-router-dom";
import "./Agent.css";
import AgentsSection from "./AgentsSection";
const Agent = () => {
  return (
    <>
      <main id="main">
        <div classNameName="container-fluid  mb-5 agent">
          <h3 className="mt-4 agent-title">Find an Agent</h3>
          <div className="container">
            <div className="row g-2">
              <div className="col-md-10">
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control border-0 py-3"
                      placeholder="Location"
                    />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select border-0 py-3">
                      <option selected>Property Type</option>
                      <option value="1">Property Type 1</option>
                      <option value="2">Property Type 2</option>
                      <option value="3">Property Type 3</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select border-0 py-3">
                      <option selected>Specialties</option>
                      <option value="1">Location 1</option>
                      <option value="2">Location 2</option>
                      <option value="3">Location 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button className="btn border-0 w-100 py-2 btn-custom">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="container">
            <div className="bg-light rounded p-3">
              <div className="bg-white rounded p-4 contact">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-6">
                    <img
                      className="img-fluid rounded w-100"
                      src={agent}
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6 ">
                    <div className="mb-4">
                      <h1 className="mb-3">Contact With Our Certified Agent</h1>
                      <p>
                        Eirmod sed ipsum dolor sit rebum magna erat. Tempor
                        lorem kasd vero ipsum sit sit diam justo sed vero dolor
                        duo.
                      </p>
                    </div>
                    <Link href="#" className="btn me-3 contact-icon ii ">
                      <i className="bi bi-telephone-fill"></i>Make A Call
                    </Link>
                    <Link href="#" className="btn btn-dark  contact-icon ">
                      <i className="bi bi-calendar-week"></i>Get Appoinment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AgentsSection />
      </main>
    </>
  );
};

export default Agent;
