import React from 'react';
import { Link } from 'react-router-dom';
import './AgentsSection.css';

const AgentCard = ({ agent }) => (
  <div className="col-md-4">
    <div className="card-box-d">
      <div className="card-img-d">
        <img src={agent.passport || 'https://via.placeholder.com/150'}  alt={`${agent.name}'s profile`} className="img-d img-fluid"/>
      </div>
      <div className="card-overlay card-overlay-hover">
        <div className="card-header-d">
          <div className="card-title-d align-self-center">
            <h3 className="title-d">
              <Link to={`/agent/${agent.id}`} className="link-two">{agent.name}<br/> {agent.surname}</Link>
            </h3>
          </div>
        </div>
        <div className="card-body-d">
          <p className="content-d text-white">
            {agent.about}
          </p>
          <div className="info-agents color-a">
            <p><strong>Phone: </strong> {agent.phone}</p>
            <p><strong>Email: </strong> {agent.email}</p>
          </div>
        </div>
        <div className="card-footer-d">
          <div className="socials-footer d-flex justify-content-center">
            <ul className="list-inline">
              {agent.socials && Array.isArray(agent.socials) && agent.socials.map((social, index) => (
                <li className="list-inline-item" key={index}>
                  <a href="#" className="link-one">
                    <i className={social.icon} aria-hidden="true"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AgentCard;
