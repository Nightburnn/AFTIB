import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequests } from '../../../../utils/adminOpsRequests'; 
import './AgentReview.css'; 

const AgentReview = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const fetchAgentRequests = async () => {
      try {
        const response = await fetchRequests();
        console.log(response.data); 
        setAgents(response.data); 
      } catch (error) {
        console.error("Error fetching agent requests:", error);
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };
  useEffect(() => {
    fetchAgentRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="container agency">
      <div className="py-4 agent">
        <h1 className="text-center">Pending Agent Review</h1>
        <h3 className="text-center">Below are the list of agents request that are pending approval. Review them for approval.</h3>
      </div>
      <div className="row mt-4">
        {Array.isArray(agents) && agents.length > 0 ? ( 
          agents.map(agent => (
            <div className="col-md-6 mb-4" key={agent.id}>
              <div className="card text-center">
                <div className="card-body">
                  <img
                    src={agent.passport || "https://via.placeholder.com/150"} 
                    className="rounded-circle mb-3"
                    alt={`${agent.name}'s profile`}
                  />
                  <div className="agent-info">
                    <h5>Agent Name</h5>
                    <p>{agent.name}</p>
                    <h5>Agency Type:</h5>
                    <p>{agent.agency}</p>
                  </div>
<<<<<<< HEAD
                  <Link to={`/approve/${agent._id}`} className="btn btn-primary btn-block">Review this prospect</Link>
=======
                  <Link to={`/approve/${agent.id}`} className="btn blue btn-block">Review this prospect</Link>
>>>>>>> 0e39d72ac712a35e22a055ba98b62752d862b0cc
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No pending agent requests.</div> 
        )}
      </div>
    </div>
  );
}

export default AgentReview;
