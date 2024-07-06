import React, { useEffect, useState } from "react";
import AgentCard from "./AgentCard";
import "./AgentsSection.css";
import { fetchAapprovedAgents } from "../../utils/adminOpsRequests"; // Adjust path as necessary
import { useLoading } from "../../Components/LoadingContext"; // Adjust path as necessary

const AgentsSection = ({ agents, isSearching }) => {
  const [allAgents, setAllAgents] = useState([])
  const [error, setError] = useState(null)
  const { setLoading, setLoadingText } = useLoading()

  const fetchAgents = async () => {
    try {
      setLoading(true)
      setLoadingText("Fetching Approved Agents")
      const response = await fetchAapprovedAgents()
      console.log("Approved Agents Data:", response.data)
      setAllAgents(response.data)
    } catch (error) {
      console.error("Error fetching agents:", error)
      setError(error.message)
    } finally {
      setLoading(false)
      setLoadingText("")
    }
  };
  useEffect(() => {
    fetchAgents()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  const displayedAgents = isSearching ? agents : allAgents

  return (
    <section className="section-agents section-t8">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="title-wrap d-flex justify-content-between mb-3">
              <div className="title-box">
                <h2 className="title-a">Aftib Agents</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {displayedAgents.map((agent, index) => (
            <AgentCard agent={agent} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
