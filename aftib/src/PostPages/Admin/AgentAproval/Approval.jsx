import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import {
  getAgencyRequestById,
  approveRequest,
  rejectRequest
} from "../../../utils/adminOpsRequests";
import "./Approval.css";
import { useLoading } from "../../../Components/LoadingContext";

const Approval = () => {
  let token = window.localStorage.getItem("accessToken");
  let [showModal, setShowModal] = useState(false);
  let [modalTitle, setModalTitle] = useState("");
  let [modalBody, setModalBody] = useState("");
  let { setLoading, setLoadingText } = useLoading();
  let [rMessage,setRMessage] = useState('')
  let navigate = useNavigate();
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const fetchAgentRequest = async () => {
    try {
      setLoading(true);
      setLoadingText("Fetching Agent Information");
      const response = await getAgencyRequestById(id);
      console.log(response.data);
      setAgent(response.data);
    } catch (error) {
      console.error("Error fetching agent request:", error);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };
  const sendApproveRequest = async (id) => {
    setLoading(true);
    setLoadingText("Approving User");
    try {
      let response = await approveRequest(id, token);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      navigate("/admin-dashboard");
      setLoading(false);
      setLoadingText("");
    }
  };
  const sendRejectRequest = async (id) => {
    if(rMessage === ''){
      console.log('rMessage')
      setShowModal(true)
      setModalTitle('Input a rejection Message')
      setModalBody('Inform the agent of the reason their request has been reject to they can update it and return the correct one.')
       return;
    }
    try {
    setLoading(true);
    setLoadingText("Please Wait");
      let response = await rejectRequest(id, token,rMessage);
      setShowModal(true)
      setModalTitle('Successful')
      setModalBody('Agent would be notified of the rejection and prompted to update their data')
      console.log(response.data);
    } catch (err) {
      setShowModal(true)
      setModalTitle('Error Occured')
      setModalBody(err.message)
      console.error(err.message);
    } finally {
      setTimeout(()=>{
      navigate("/admin-dashboard");
      setLoading(false);
      setLoadingText("");
      }, 3000)
    }
  };

  useEffect(() => {
    fetchAgentRequest(id);
  }, [id]);

  if (!agent) {
    return (
      <div
        onClick={() => {
          fetchAgentRequest(id);
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="container agent-detail">
            <Modal
        title={modalTitle}
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={"Try Again"}
      >
        <p>{modalBody}</p>
      </Modal>
      <div className="header">
        <h1 className="text-center">Agent Review</h1>
      </div>

      <div className="section border profile-section">
        <div className="profile text-center">
          <img
            src={agent.passport}
            className="rounded-circle"
            alt="Agent profile"
          />
          <h3>{agent.name}</h3>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Informations</h2>
        <div className="info-agent">
          <p>
            <strong>Business Name:</strong> {agent.businessName}
          </p>
          <p>
            <strong>Agency Type:</strong> {agent.agencyType}
          </p>
          <p>
            <strong>Identification Type:</strong>{" "}
            {agent.agencyType === "Company" ? "CAC Number" : "NIN Number"}
          </p>
          <p>
            <strong>
              {agent.agencyType === "Company" ? "CAC Number" : "NIN Number"}:
            </strong>{" "}
            {agent.agencyType === "Company" ? agent.CACRef : agent.ninNumber}
          </p>
          <p>
            <strong>Office Address:</strong> {agent.officeAddress}
          </p>
          <p>
            <strong>State:</strong> {agent.state}
          </p>
          <p>
            <strong>LGA:</strong> {agent.LGA}
          </p>
          <p>
            <strong>Phone Number:</strong> {agent.phone}
          </p>
          <p>
            <strong>Whatsapp Number:</strong> {agent.whatsappNo}
          </p>
          <p>
            <strong>About the Agent / Organization:</strong> {agent.about}
          </p>
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
          Send a mail to the user notifying them of any shortcomings or
          observations that might need to be added or changed in their request
          to be approved.
        </p>
      </div>

      <div className="section border">
        <h2 className="text-center">Approval Section</h2>
        <p className="text-center">
          If you are satisfied with the agent and have concluded your vetting,
          click the approval button. Note that by approving this user request,
          you grant this user the ability to use the agents feature of this
          website and post their listing.
        </p>
        <div className="text-center">
          <button
            onClick={() => {
              sendApproveRequest(agent._id);
            }}
            className="btn blue approval-btn"
          >
            Approve This Request
          </button>
        </div>
      </div>

      <div className="section  reject">
        <h2 className="text-center">Rejection Section</h2>
        <p className="text-center">
          If you are not satisfied with the agent, please provide a reason for rejection.
        </p>
        <div className="text-center">
          <textarea
            placeholder="Enter your rejection reason here"
            className="form-control"
            value={rMessage}
            onChange={(e)=>setRMessage(e.target.value)}
          />
          <button
           onClick={()=>{
            sendRejectRequest(agent._id)
           }}
            className="btn danger mt-4"
          >
            Reject This Request
          </button>
        </div>
      </div>
    
    </div>
  );
};

export default Approval;
