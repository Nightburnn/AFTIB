import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AgentsSection.css";

const AgentCard = ({ agent }) => {
  // Create the social media links array from the agent data
  const socialMediaLinks = [
    { platform: 'facebook', link: agent.facebookLink, icon: 'bi bi-facebook' },
    { platform: 'instagram', link: agent.instagramLink, icon: 'bi bi-instagram' },
    { platform: 'twitter', link: agent.twitterLink, icon: 'bi bi-twitter' },
    { platform: 'whatsapp', link: `https://wa.me/${agent.whatsappNo}`, icon: 'bi bi-whatsapp' },
    // Add more platforms if needed
  ].filter(social => social.link); // Filter out any social links that are not defined

  return (
    <div className="col-md-4 agentcardb">
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
          <div className="socials-footer d-flex justify-content-start">
            <ul className="list-inline">
              {socialMediaLinks.map((social, index) => (
                <li className="list-inline-item" key={index}>
                  <a href={social.link} className="link-one" target="_blank" rel="noopener noreferrer">
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
};

export default AgentCard;
