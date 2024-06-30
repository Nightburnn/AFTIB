import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAapprovedAgents } from '../../../../utils/adminOpsRequests';
import { useLoading } from '../../../../Components/LoadingContext';

const ApprovedAgents = () => {
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);
  let { setLoading, setLoadingText } = useLoading();

  const fetchAgentRequests = async () => {
    try {
      setLoading(true);
      setLoadingText('Fetching Approved Agents');
      const response = await fetchAapprovedAgents();
      console.log('Approved Agents Data:', response.data);
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agent requests:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  useEffect(() => {
    fetchAgentRequests();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container agency">
      <div className="py-4 agent">
        <h1 className="text-center">All Approved Agents</h1>
        <h3 className="text-center">Below are the list of approved agents.</h3>
      </div>
      <div className="row mt-4">
        {Array.isArray(agents) && agents.length > 0 ? (
          agents.map(agent => (
            <div className="col-md-6 mb-4" key={agent._id}>
              <div className="card text-center">
                <div className="card-body">
                  <img
                    src={agent.passport || 'https://via.placeholder.com/150'}
                    className="rounded-circle mb-3"
                    alt={`${agent.name}'s profile`}
                  />
                  <div className="agent-info">
                    <h5>Agent Name</h5>
                    <p>{agent.name}</p>
                    <h5>Agency Type:</h5>
                    <p>{agent.agency}</p>
                  </div>
                  <Link to={`/vaadetails/${agent._id}`} className="btn blue btn-block">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Approved Agents.</div>
        )}
      </div>
    </div>
  );
};

export default ApprovedAgents;
