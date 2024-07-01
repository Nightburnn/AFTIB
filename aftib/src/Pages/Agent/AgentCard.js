import React from "react";
import { Link } from "react-router-dom";
import "./AgentsSection.css";
import { approveListing } from "../../utils/adminOpsRequests"; // Ensure the path is correct

const AgentCard = ({ agent, token, onApprove }) => {
  const handleApprove = async () => {
    try {
      const data = await approveListing(agent._id, token);
      onApprove(agent._id, data);
    } catch (error) {
      console.error("Error approving listing:", error);
    }
  };

  return (
    <div className="col-md-4">
      <div className="card-box-d">
        <div className="card-img-d">
          <img
            src={agent.passport}
            alt={`${agent.name}`}
            className="img-d img-fluid"
          />
        </div>
        <div className="card-overlay card-overlay-hover">
          <div className="card-header-d">
            <div className="card-title-d align-self-center">
              <h3 className="title-d">
                <Link to={`/agent/${agent._id}`} className="link-two">
                  {agent.name}
                  <br /> {agent.businessName}
                </Link>
              </h3>
            </div>
          </div>
          <div className="card-body-d">
            <p className="content-d text-white">{agent.about}</p>
            <div className="info-agents color-a">
              <p>
                <strong>Phone: </strong> {agent.phone}
              </p>
              <p>
                <strong>Email: </strong> {agent.email}
              </p>
            </div>
          </div>
          <div className="card-footer-d">
            <div className="socials-footer d-flex justify-content-center">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href={agent.facebookLink} className="link-one">
                    <i className="fab fa-facebook-f" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href={agent.instagramLink} className="link-one">
                    <i className="fab fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href={agent.twitterLink} className="link-one">
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
            <button className="btn btn-approve" onClick={handleApprove}>
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
