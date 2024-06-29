import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgencyRequestById,approveRequest } from '../../../utils/adminOpsRequests'; 
import './Approval.css';
import { useLoading } from '../../../Components/LoadingContext';

const Approval = () => {
  let token = window.localStorage.getItem("accessToken");
  let {setLoading,setLoadingText}= useLoading()
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
    const fetchAgentRequest = async () => {
      try {
        setLoading(true)
        setLoadingText('Fetching Agent Information')
        const response = await getAgencyRequestById(id)
        console.log(response.data)
        setAgent(response.data)
      } catch (error) {
        console.error('Error fetching agent request:', error)
      }
      finally {        
        setLoading(false)
        setLoadingText('')
      }
    };
    const sendApproveRequest =async (id)=>{
      setLoading(true)
      setLoadingText('Approving User')
      try {
        let response = await approveRequest(id,token)
        console.log(response.data)
      }
      catch(err) {
        console.error(err.message)
      }
      finally {
        setLoading(false)
        setLoadingText('')
      }
    }

  useEffect(() => {
    fetchAgentRequest(id);
  }, [id]);

  if (!agent) {
    return <div onClick={()=>{fetchAgentRequest(id)}}>Loading...</div>;
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
          <p><strong>Phone Number:</strong> {agent.phoneNumber}</p>
          <p><strong>Whatsapp Number:</strong> {agent.whatsappNumber}</p>
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
          Send a mail to the user notifying them of any shortcomings or observations that might need to be added or changed in their request to be approved.
        </p>
      </div>

      <div className="section border">
        <h2 className="text-center">Approval Section</h2>
        <p className="text-center">
          If you are satisfied with the agent and have concluded your vetting, click the approval button. Note that by approving this user request, you grant this user the ability to use the agents feature of this website and post their listing.
        </p>
        <div className="text-center">
          <button onClick={()=>{sendApproveRequest(agent._id)}} className="btn blue approval-btn">Approve This Request</button>
        </div>
      </div>
    </div>
  );
}

export default Approval;
