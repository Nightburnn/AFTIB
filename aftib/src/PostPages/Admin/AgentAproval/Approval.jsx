import React from 'react';
import './Approval.css'; // Import the CSS file

const Approval = () => {
  return (
    <div className="container agent-detail">
      <div className="header">
        <h1 className="text-center">Agent Review</h1>
      </div>

      <div className="section border profile-section">
        <div className="profile text-center">
          <img src="https://via.placeholder.com/150" className="rounded-circle" alt="Agent profile" />
          <h3>Angelica Baker</h3>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Informations</h2>
        <div className="info-agent">
          <p><strong>Business Name:</strong> Angelica House Finders</p>
          <p><strong>Agency Type:</strong> Individual</p>
          <p><strong>Identification Type:</strong> NIN</p>
          <p><strong>NIN Number:</strong> 9209302948049</p>
          <p><strong>Office Address:</strong> 1, bla road, Ikeja, Lagos.</p>
          <p><strong>State:</strong> Lagos</p>
          <p><strong>LGA:</strong> Eti-Osa</p>
          <p><strong>Phone Number:</strong> 9209302948049</p>
          <p><strong>Whatsapp Number:</strong> 903920994884</p>
          <p><strong>About the Agent / Organization:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

      <div className="section border">
        <h2 className="text-center">Government Issued ID</h2>
        <div className="text-center">
          <img src="https://via.placeholder.com/300" className="gov-id" alt="Government ID" />
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
          <button className="btn btn-primary approval-btn">Approve This Request</button>
        </div>
      </div>
    </div>
  );
}

export default Approval;
