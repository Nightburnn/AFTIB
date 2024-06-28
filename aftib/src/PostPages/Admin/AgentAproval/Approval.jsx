import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgencyRequestById } from '../../../utils/adminOpsRequests'; 
import './Approval.css';

const Approval = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchAgentRequest = async () => {
      try {
        
        const response = await getAgencyRequestById(id);
        setAgent(response);
      } catch (error) {
        console.error('Error fetching agent request:', error);
      }
    };

    fetchAgentRequest();
  }, [id]);

  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container agent-detail">
      <div className="header">
        <h1 className="text-center">Agent Review</h1>
      </div>

      <div className="section border profile-section">
        <div className="profile text-center">
          <img src={agent.profilePic} className="rounded-circle" alt="Agent profile" />
          <h3>{agent.name}</h3>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Informations</h2>
        <div className="info-agent">
          <p><strong>Business Name:</strong> {agent.businessName}</p>
          <p><strong>Agency Type:</strong> {agent.agencyType}</p>
          <p><strong>Identification Type:</strong> {agent.identificationType}</p>
          <p><strong>Identification Number:</strong> {agent.identificationNumber}</p>
          <p><strong>Office Address:</strong> {agent.officeAddress}</p>
          <p><strong>State:</strong> {agent.state}</p>
          <p><strong>LGA:</strong> {agent.lga}</p>
          <p><strong>Phone Number:</strong> {agent.phoneNumber}</p>
          <p><strong>Whatsapp Number:</strong> {agent.whatsappNumber}</p>
          <p><strong>About the Agent / Organization:</strong> {agent.about}</p>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Government Issued ID</h2>
        <div className="text-center">
          <img src={agent.govIdImage} className="gov-id" alt="Government ID" />
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Notify The User</h2>
        <p className="text-center">
          Send a mail to the user notifying them of any shortcomings or observations that might need to be added or changed in their request to be approved.
        </p>
      </div>

      <div className="section border">
        <h2 className="text-center">Approval Section</h2>
        <p className="text-center">
          If you are satisfied with the agent and have concluded your vetting, click the approval button. Note that by approving this user request, you grant this user the ability to use the agents feature of this website and post their listing.
        </p>
        <div className="text-center">
          <button className="btn blue approval-btn">Approve This Request</button>
        </div>
      </div>
    </div>
  );
}

export default Approval;
