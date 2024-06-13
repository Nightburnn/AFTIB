import React from 'react';
import AgentCard from './AgentCard';
import './AgentsSection.css'
import { Link } from 'react-router-dom';

const agents = [
  {
    id: 1,
    name: "Margaret Sotillo",
    surname: "Escala",
    img: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFnZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    phone: "+54 356 945234",
    email: "agents@example.com",
    description: "Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.",
    socials: [
      { name: "facebook", icon: "bi bi-facebook" },
      { name: "twitter", icon: "bi bi-twitter" },
      { name: "instagram", icon: "bi bi-instagram" },
      { name: "linkedin", icon: "bi bi-linkedin" },
    ],
  },
  {
    id: 2,
    name: "Stiven Spilver",
    surname: "Darw",
    img: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFnZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    phone: "+54 356 945234",
    email: "agents@example.com",
    description: "Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.",
    socials: [
      { name: "facebook", icon: "bi bi-facebook" },
      { name: "twitter", icon: "bi bi-twitter" },
      { name: "instagram", icon: "bi bi-instagram" },
      { name: "linkedin", icon: "bi bi-linkedin" },
    ],
  },
  {
    id: 3,
    name: "Emma Toledo",
    surname: "Cascada",
    img: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFnZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    phone: "+54 356 945234",
    email: "agents@example.com",
    description: "Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.",
    socials: [
      { name: "facebook", icon: "bi bi-facebook" },
      { name: "twitter", icon: "bi bi-twitter" },
      { name: "instagram", icon: "bi bi-instagram" },
      { name: "linkedin", icon: "bi bi-linkedin" },
    ],
  },
];

const AgentsSection = () => (
  <section className="section-agents section-t8">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-wrap d-flex justify-content-between">
            <div className="title-box">
              <h2 className="title-a">Best Agents</h2>
            </div>
            <div className="title-link">
              <Link to="/all">All Agents
                <span className="bi bi-chevron-right"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {agents.map((agent, index) => (
          <AgentCard agent={agent} key={index} />
        ))}
      </div>
    </div>
  </section>
);

export default AgentsSection;
