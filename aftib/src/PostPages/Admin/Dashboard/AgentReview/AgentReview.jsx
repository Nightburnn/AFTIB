import React from 'react';
import { Link } from 'react-router-dom';
import './AgentReview.css'; 

const agents = [
  { id: 1, name: "John Doe", agency: "Real Estate Agency", profilePic: "https://via.placeholder.com/150" },
  { id: 2, name: "Jane Smith", agency: "Property Solutions", profilePic: "https://via.placeholder.com/150" },
  { id: 3, name: "Sam Wilson", agency: "Home Experts", profilePic: "https://via.placeholder.com/150" },
  { id: 4, name: "Emily Johnson", agency: "Luxury Estates", profilePic: "https://via.placeholder.com/150" },
  { id: 5, name: "Michael Brown", agency: "Prime Properties", profilePic: "https://via.placeholder.com/150" },
  { id: 6, name: "Linda Davis", agency: "Elite Realty", profilePic: "https://via.placeholder.com/150" },
  { id: 7, name: "David Wilson", agency: "Metro Homes", profilePic: "https://via.placeholder.com/150" },
  { id: 8, name: "Sarah Lee", agency: "Urban Living", profilePic: "https://via.placeholder.com/150" },
  { id: 9, name: "James White", agency: "Suburban Realty", profilePic: "https://via.placeholder.com/150" },
];

const AgentReview = () => {
  return (
    <div className="container agency">
      <div className="py-4 agent">
        <h1 className="text-center">Pending Agent Review</h1>
        <h3 className="text-center">Below are the list of agents request that are pending approval review them for approval</h3>
      </div>
      
      <div className="row mt-4">
        {agents.map(agent => (
          <div className="col-md-4 mb-4" key={agent.id}>
            <div className="card text-center">
              <div className="card-body">
                <img
                  src={agent.profilePic}
                  className="rounded-circle mb-3"
                  alt={`${agent.name}'s profile`}
                />
                  <div className="agent-info">
                  <h5>Agent Name</h5>
                  <p>{agent.name}</p>
                  <h5>Agency Type:</h5>
                  <p>{agent.agency}</p>
                </div>
                <Link to="/approve" className="btn btn-primary btn-block">Review this prospect</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentReview;
