import React, { useState, useEffect } from "react";
import agent from "../../assets/images/agent.png";
import { Link } from "react-router-dom";
import "./Agent.css";
import AgentsSection from "./AgentsSection";
import { searchForAgents } from "../../utils/adminOpsRequests";
import { fetchAapprovedAgents } from "../../utils/adminOpsRequests";
import AgentCard from "./AgentCard";
import { useLoading } from "../../Components/LoadingContext";

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [searchResult,setSearchResult] = useState([])
  const [showCertifiedAgent, setShowCertifiedAgent] = useState(true);
  const [searchQuery, setSearchQuery] = useState("")
  const [showDefault,setShowDefault] = useState(true)
  const { setLoading, setLoadingText } = useLoading();
  const [error, setError] = useState(null);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setLoadingText("Fetching Approved Agents");
      const response = await fetchAapprovedAgents();
      console.log("Approved Agents Data:", response.data);
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };
  useEffect(() => {
    fetchAgents();
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault()
    const fetchedAgents = await searchForAgents({ location: searchQuery })
    console.log(fetchedAgents.data)
    setSearchResult(fetchedAgents.data)
    setShowDefault(false)
    setShowCertifiedAgent(false)
  }

  if(error){
    return <div>Error: {error}</div>
  }

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
                        <h1 className="mb-3">Search for Approved Agents.</h1>
                        <p>
                         Our agents are seasoned professionals who are experieenced in getting you the best deals. All Agents here have been vetted and have been approved.
                        </p>
                      </div>
                      <Link to="https://wa.me/phoneNumber?text=Hello%2C%20I%20am%20interested%20in%20your%20property" className="btn me-3 contact-icon ii">
                        <i className="bi bi-whatsapp"></i>Get Recommendation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <section className="section-agents section-t8">
      <div className="container">
      
        <div className="row">
          <div className="col-md-12">
            <div className="title-wrap d-flex justify-content-between mb-3">
              <div className="title-box">
                <h2 className="title-a">Aftib Agents</h2>
                {showDefault? <div>Showing All agents</div>: <div>Showing Location Search results for <b>"{searchQuery}"</b> <button onClick={()=>{setShowCertifiedAgent(true);setShowDefault(true)}} className="btn btn-primary">Clear Search</button></div>}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {agents.length == 0 && showDefault == false? <div>No results found for the location query. <b>"{searchQuery}"</b>. Try making sure your search text is correct.</div>: null}
          {showDefault? agents.map((agent, index) => (
            <AgentCard agent={agent} key={index} />
          )): searchResult.map((agent, index) => (
            <AgentCard agent={agent} key={index} />
          ))}
        </div>
      </div>
    </section>
      </main>
    </>
  );
};

export default Agent;
