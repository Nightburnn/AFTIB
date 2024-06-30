import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Replace with actual fetchRequests function when integrating with backend
// import { fetchRequests } from '../../../../utils/adminOpsRequests';

// Mock data for testing purposes
const mockAgentRequests = [
  {
    _id: '1',
    name: 'John Doe',
    agency: 'Individual',
    passport: 'https://via.placeholder.com/150',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    agency: 'Agency',
    passport: 'https://via.placeholder.com/150',
  },
];

const Vca = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock fetch agent requests function
  const fetchAgentRequests = async () => {
    try {
      // Simulate API call delay for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Replace with actual fetchRequests() when integrating with backend
      // const response = await fetchRequests();
      // setAgents(response.data);
      setAgents(mockAgentRequests); // Set mock data
    } catch (error) {
      console.error('Error fetching agent requests:', error);
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
        <h1 className="text-center">All Clients</h1>
        <h3 className="text-center">
          Below are the list of Client.
        </h3>
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
                  <Link to='/Vcadetails' className="btn blue btn-block">
                  View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Client.</div>
        )}
      </div>
    </div>
  );
};

export default Vca;
