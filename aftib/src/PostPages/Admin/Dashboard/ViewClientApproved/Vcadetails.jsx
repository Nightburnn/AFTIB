import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "../../../../Components/LoadingContext";

// Mock data for testing purposes
const mockAgent = {
  _id: "6686a115c475b7532bcfe04b",
  accountType: "client",
  agentSpecialities: [],
  email: "tochukwueagles7@gmail.com",
  hash: "$2a$10$0FWQrrwZ/z5OaXh9dS20j.kSp4/kx5g8y.easHskqXsrX5bM8PQk2",
  mobileNumber: "+23407088572141",
  myHotelBookings: [],
  myHotelReservations: [],
  myHotels: [],
  myListings: [],
  myPurchases: [],
  myRentals: [],
  mySales: [],
  myShortLets: [],
  myTransactions: [],
  name: "Tochukwu Chikezie",
  signupType: "emailAndPassword",
  verified: false,
  __v: 0,
};

const Vcadetails = () => {
  let token = window.localStorage.getItem("accessToken");
  let { setLoading, setLoadingText } = useLoading();
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  // Mock fetch agent request function
  const fetchAgentRequest = async (id) => {
    setLoading(true);
    setLoadingText("Fetching Agent Information");
    try {
      // Simulate API call delay for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Replace with actual getAgencyRequestById(id) when integrating with backend
      // const response = await getAgencyRequestById(id);
      // setAgent(response.data);
      setAgent(mockAgent); // Set mock data
    } catch (error) {
      console.error("Error fetching agent request:", error);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  // Mock send approve request function
  const sendApproveRequest = async (id) => {
    setLoading(true);
    setLoadingText("Approving User");
    try {
      // Replace with actual approveRequest(id, token) when integrating with backend
      // let response = await approveRequest(id, token);
      // console.log(response.data);
      console.log("Agent approved:", mockAgent); // Log mock data
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
      setLoadingText("");
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
      <div className="header">
        <h1 className="text-center">Client</h1>
      </div>

      <div className="section border profile-section">
        <div className="profile text-center">
          <h3>{agent.name}</h3>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Informations</h2>
        <div className="info-agent">
          <p>
            <strong>Client Name:</strong> {agent.name}
          </p>
          <p>
            <strong>Account Type:</strong> {agent.accountType}
          </p>
          <p>
            <strong>Email:</strong> {agent.email}
          </p>
          <p>
            <strong>Mobile Number:</strong> {agent.mobileNumber}
          </p>
          <p>
            <strong>Signup Type:</strong> {agent.signupType}
          </p>
          <p>
            <strong>Verified:</strong> {agent.verified ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Notify The User</h2>
        <p className="text-center">
          {agent.verified
            ? "User is verified."
            : " Please remind the user to verify their account by confirming their email."}
        </p>
      </div>

      <div className="section border">
        <h2 className="text-center">Disable Section</h2>
        <p className="text-center">
          Are you sure you want to Disable this client? This action cannot be
          undone.
        </p>
        <div className="text-center">
          <button
            onClick={() => {
              sendApproveRequest(agent._id);
            }}
            className="btn danger approval-btn"
          >
            Disable this Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vcadetails;
