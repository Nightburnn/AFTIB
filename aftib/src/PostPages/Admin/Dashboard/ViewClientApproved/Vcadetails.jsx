import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../../utils/adminOpsRequests";
import { useLoading } from "../../../../Components/LoadingContext";

const Vcadetails = () => {
  let token = window.localStorage.getItem("accessToken");
  let { setLoading, setLoadingText } = useLoading();
  const { id } = useParams();
  const [client, setClient] = useState(null);

  const fetchClientAccounts = async (id) => {
    setLoading(true);
    setLoadingText("Fetching Agent Information");
    try {
      const response = await getUserById(id);
      setClient(response.data);
      console.log("Client Data:", response.data);
    } catch (error) {
      console.error("Error fetching agent request:", error);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  useEffect(() => {
    fetchClientAccounts(id);
  }, [id]);

  if (!client) {
    return (
      <div
        onClick={() => {
          fetchClientAccounts(id);
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="container client-detail">
    <div className="header">
      <h1 className="text-center">Client</h1>
    </div>

    <div className="section border profile-section">
      <div className="profile text-center">
        <h3>{client.name}</h3>
      </div>
    </div>

    <div className="section border">
      <h2 className="text-center">Information</h2>
      <div className="info-client">
        <p>
          <strong>Client Name:</strong> {client.name}
        </p>
        <p>
          <strong>Account Type:</strong> {client.accountType}
        </p>
        <p>
          <strong>Email:</strong> {client.email}
        </p>
        <p>
          <strong>Mobile Number:</strong> {client.mobileNumber}
        </p>
        <p>
          <strong>Signup Type:</strong> {client.signupType}
        </p>
        <p>
          <strong>Verified:</strong> {client.verified ? "Yes" : "No"}
        </p>
      </div>
    </div>

    <div className="section border">
      <h2 className="text-center">Notify The User</h2>
      <p className="text-center">
        {client.verified
          ? "User is verified."
          : " Please remind the user to verify their account by confirming their email."}
      </p>
    </div>
  </div>
);
};

export default Vcadetails;
