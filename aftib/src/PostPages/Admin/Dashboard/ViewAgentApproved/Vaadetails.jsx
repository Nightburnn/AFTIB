import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgencyRequestById } from '../../../../utils/adminOpsRequests'; 
import { useLoading } from '../../../../Components/LoadingContext';

const Vaadetails = () => {
  let token = window.localStorage.getItem('accessToken');
  let { setLoading, setLoadingText } = useLoading();
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  const fetchAgentRequest = async (id) => {
    setLoading(true);
    setLoadingText('Fetching Agent Information');
    try {
      const response = await getAgencyRequestById(id);
      setAgent(response.data);
    } catch (error) {
      console.error('Error fetching agent request:', error);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  useEffect(() => {
    fetchAgentRequest(id);
  }, [id]);

  if (!agent) {
    return <div onClick={() => { fetchAgentRequest(id) }}>Loading...</div>;
  }

  return (
    <div className="container agent-detail">
      <div className="header">
        <h1 className="text-center">Agent Review</h1>
      </div>

      <div className="section border profile-section">
        <div className="profile text-center">
          <img src={agent.passport} className="rounded-circle" alt="Agent profile" />
          <h3>{agent.name}</h3>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Informations</h2>
        <div className="info-agent">
          <p><strong>Business Name:</strong> {agent.businessName}</p>
          <p><strong>Agency Type:</strong> {agent.agencyType}</p>
          <p><strong>Identification Type:</strong> {agent.agencyType === 'Company' ? 'CAC Number' : 'NIN Number'}</p>
          <p><strong>{agent.agencyType === 'Company' ? 'CAC Number' : 'NIN Number'}:</strong> {agent.agencyType === 'Company' ? agent.CACRef : agent.ninNumber}</p>
          <p><strong>Office Address:</strong> {agent.officeAddress}</p>
          <p><strong>State:</strong> {agent.state}</p>
          <p><strong>LGA:</strong> {agent.LGA}</p>
          <p><strong>Phone Number:</strong> {agent.phone}</p>
          <p><strong>Whatsapp Number:</strong> {agent.whatsappNo}</p>
          <p><strong>About the Agent / Organization:</strong> {agent.about}</p>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Government Issued ID</h2>
        <div className="text-center">
          <img src={agent.IssuedId} className="gov-id" alt="Government ID" />
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Notify The User</h2>
        <p className="text-center">
          This account has already been approved. You can contact the user if there are any updates or changes required.
        </p>
      </div>

      <div className="section border">
        <h2 className="text-center">Approval Section</h2>
        <p className="text-center">
          Are you sure you want to disable this agent? This action cannot be undone.
        </p>
        <div className="text-center">
          <button  className="btn danger approval-btn">Disable this Agent</button>
        </div>
      </div>
    </div>
  );
};

export default Vaadetails;
