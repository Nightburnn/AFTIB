import React, { useState } from "react";
import agent from "../../assets/images/agent.png";
import { Link } from "react-router-dom";
import "./Agent.css";
import AgentsSection from "./AgentsSection";
import { searchForAgents } from "../../utils/adminOpsRequests";

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [showCertifiedAgent, setShowCertifiedAgent] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const fetchedAgents = await searchForAgents({ location });
    setAgents(fetchedAgents);
    setShowCertifiedAgent(false);
  };

  return (
    <>
      <div className="row list">
        <div className="pListing">
          <h2>Find An Agent</h2>
          <div className="p-item">
            <form onSubmit={handleSearch} className="plisting-head me-3">
              <input
                type="text"
                name="location"
                placeholder="Search for agent based on location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
            <button className="p-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <main id="main">
        
        {showCertifiedAgent && (
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
                      <Link to="https://wa.me/phoneNumber?text=Hello%2C%20I%20am%20interested%20in%20your%20property" className="btn me-3 contact-icon ii">
  <i className="bi bi-whatsapp"></i>Contact on WhatsApp
</Link>

<Link to="mailto:agent@example.com?subject=Property%20Inquiry&body=Hello%2C%20I%20am%20interested%20in%20your%20property" className="btn me-3 contact-icon ii">
  <i className="bi bi-envelope-fill"></i>Send an Email
</Link>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <AgentsSection agents={agents} />
      </main>
    </>
  );
};

export default Agent;
