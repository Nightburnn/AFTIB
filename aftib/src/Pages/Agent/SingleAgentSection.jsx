import React from "react";
import { useParams } from "react-router-dom";
import "./AgentsSection.css";

const agents = [
  {
    id: 1,
    name: "Margaret Sotillo",
    surname: "Escala",
    img: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFnZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    phone: "+54 356 945234",
    email: "agents@example.com",
    description:
      "Sed porttitor lectus nibh, Cras ultricies ligula sed magna dictum porta two.",
    socials: [
      { name: "facebook", icon: "bi bi-facebook" },
      { name: "twitter", icon: "bi bi-twitter" },
      { name: "instagram", icon: "bi bi-instagram" },
      { name: "linkedin", icon: "bi bi-linkedin" },
    ],
  },
  // Add more agents here...
];

const SingleAgentSection = () => {
  const { id } = useParams();
  const agent = agents.find((agent) => agent.id === parseInt(id));

  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <section className="intro-single">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <div className="title-single-box">
              <h1 className="title-single">{agent.name}</h1>
              <span className="color-text-a">{agent.surname}</span>
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <nav
              aria-label="breadcrumb"
              className="breadcrumb-box d-flex justify-content-lg-end"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/agents">Agents</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {agent.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card-box-d">
              <div className="card-img-d">
                <img src={agent.img} alt="" className="img-d img-fluid" />
              </div>
              <div className="card-body-d">
                <p className="content-d color-text-a">{agent.description}</p>
                <div className="info-agents color-a">
                  <p>
                    <strong>Phone: </strong> {agent.phone}
                  </p>
                  <p>
                    <strong>Email: </strong> {agent.email}
                  </p>
                </div>
                <div className="socials-footer d-flex justify-content-center">
                  <ul className="list-inline">
                    {agent.socials.map((social, index) => (
                      <li className="list-inline-item" key={index}>
                        <a href="/" className="link-one">
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
      </div>
    </section>
  );
};

export default SingleAgentSection;
