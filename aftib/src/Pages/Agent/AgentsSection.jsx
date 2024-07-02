import React, { useEffect, useState } from "react";
import AgentCard from "./AgentCard";
import "./AgentsSection.css";
import { Link } from "react-router-dom";
import { fetchAapprovedAgents } from "../../utils/adminOpsRequests"; // Adjust path as necessary
import { useLoading } from "../../Components/LoadingContext"; // Adjust path as necessary

const AgentsSection = () => {
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);
  const { setLoading, setLoadingText } = useLoading();

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="section-agents section-t8">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="title-wrap d-flex justify-content-between">
              <div className="title-box">
                <h2 className="title-a">Best Agents</h2>
              </div>
              <div className="title-link">
                <Link to="/all">
                  All Agents
                  <span className="bi bi-chevron-right"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {agents.map((agent, index) => (
            <AgentCard agent={agent} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
