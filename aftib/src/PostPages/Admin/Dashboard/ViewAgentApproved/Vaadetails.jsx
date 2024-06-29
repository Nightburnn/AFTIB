import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../../../Components/LoadingContext';

// Mock data for testing purposes
const mockAgent = {
  _id: '1',
  name: 'John Doe',
  businessName: 'Dafemutey',
  agencyType: 'Individual',
  CACRef: '',
  ninNumber: '01234567',
  officeAddress: 'Lagos',
  state: 'Lagos',
  LGA: 'Aba North',
  phone: '8109558854',
  whatsappNo: '864225785',
  about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  IssuedId: 'https://via.placeholder.com/300',
};

const Vaadetails = () => {
  let token = window.localStorage.getItem('accessToken');
  let { setLoading, setLoadingText } = useLoading();
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  // Mock fetch agent request function
  const fetchAgentRequest = async (id) => {
    setLoading(true);
    setLoadingText('Fetching Agent Information');
    try {
      // Simulate API call delay for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Replace with actual getAgencyRequestById(id) when integrating with backend
      // const response = await getAgencyRequestById(id);
      // setAgent(response.data);
      setAgent(mockAgent); // Set mock data
    } catch (error) {
      console.error('Error fetching agent request:', error);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  // Mock send approve request function
  const sendApproveRequest = async (id) => {
    setLoading(true);
    setLoadingText('Approving User');
    try {
      // Replace with actual approveRequest(id, token) when integrating with backend
      // let response = await approveRequest(id, token);
      // console.log(response.data);
      console.log('Agent approved:', mockAgent); // Log mock data
    } catch (err) {
      console.error(err.message);
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
          <p><strong>{agent.agencyType === 'Company' ? 'CAC Number' : 'NIN Number'}:</strong> {agent.agencyType === 'Company' ? agent.CACRef : agent.ninNumber }</p>
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
        Are you sure you want to delete this agent? This action cannot be undone.
        </p>
        <div className="text-center">
          <button onClick={() => { sendApproveRequest(agent._id) }} className="btn danger approval-btn">Delete this Agent</button>
        </div>
      </div>
    </div>
  );
}

export default Vaadetails;
