import React from "react";
import { Link } from "react-router-dom";
import "./AgentsSection.css";

const AgentCard = ({ agent }) => (
  <div className="col-md-4  agentcardb">
    <div className="card-box-d">
      <div className="card-img-d">
        <img
          src={agent.passport || "https://via.placeholder.com/150"}
          alt={`${agent.name}'s profile`}
          className="img-d img-fluid rounded-circle"
        />
      </div>
      <div className="card-body-d">
        <h3 className="title-d text-center">
          <Link className="link-two">
            {agent.name} {agent.surname}
          </Link>
        </h3>
        <p className="content-d ">{agent.about}</p>
        <div className="info-agents">
        <p><strong>Phone: </strong> {agent.phone}</p>
        <p><strong>Office Address: </strong> {agent.officeAddress || ''}</p>
          <p><strong>Email: </strong> {agent.email}</p>
        </div>
        <div className="socials-footer d-flex justify-content-center">
          <ul className="list-inline">
            {agent.socials &&
              Array.isArray(agent.socials) &&
              agent.socials.map((social, index) => (
                <li className="list-inline-item" key={index}>
                  <a href={social.link} className="link-one">
                    <i className={social.icon} aria-hidden="true"></i>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default AgentCard;
