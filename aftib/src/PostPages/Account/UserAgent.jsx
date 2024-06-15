import React from 'react';
import './UserAgent.css'
import UserAgent1 from '../../assets/images/userAgent1.png'
import UserAgent2 from '../../assets/images/UserAgent2.png'
import UserAgent3 from '../../assets/images/UserAgent3.png'
import UserAgent4 from '../../assets/images/UserAgent4.svg'
function AgentPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src={UserAgent1} className="card-img-top" alt="Agent" />
            <div className="card-body">
              <p className="card-text"><strong>Location:</strong> Abuja, Nigeria</p>
              <p className="card-text"><strong>Experience:</strong> 2 years</p>
              <p className="card-text"><strong>Specialization:</strong> First-time home buyer</p>
              <button className="btn w-100">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={UserAgent2} className="card-img-top" alt="Agent" />
            <div className="card-body">
              <p className="card-text"><strong>Location:</strong> Abuja, Nigeria</p>
              <p className="card-text"><strong>Experience:</strong> 2 years</p>
              <p className="card-text"><strong>Specialization:</strong> First-time home buyer</p>
              <button className="btn w-100">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={UserAgent3} className="card-img-top" alt="Agent" />
            <div className="card-body">
              <p className="card-text"><strong>Location:</strong> Abuja, Nigeria</p>
              <p className="card-text"><strong>Experience:</strong> 2 years</p>
              <p className="card-text"><strong>Specialization:</strong> First-time home buyer</p>
              <button className="btn  w-100">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="register-section">
        <div className="row">
          <div className="col-md-8">
            <h2>Register here to become a Licensed Aftib Agent</h2>
            <button className="btn btn-light mt-3">Register Now</button>
          </div>
          <div className="col-md-4">
            <img src={UserAgent4} className="img-fluid" alt="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentPage;
