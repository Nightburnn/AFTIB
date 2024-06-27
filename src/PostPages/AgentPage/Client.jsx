import React from 'react';
import AgentClient1 from '../../assets/images/AgentClient1.png'
import './Client.css'

import UserAgent1 from '../../assets/images/userAgent1.png'
import UserAgent2 from '../../assets/images/UserAgent2.png'
import UserAgent3 from '../../assets/images/UserAgent3.png'

const Client = () => {
  return (
    <div className="client-container">
      <div className="container">
        <div className="row">

          <div className="noclient mt-5">
             <img src={AgentClient1} alt=""/>
             <h6>You don't have any client yet</h6>
          </div>


       
         
        </div>
        <div className="client-card mt-5 text-center">
  <div className="row">
    <div className="col-6 col-md-3">
      <div className="card">
        <img src={UserAgent1} className="card-img-top" alt="Agent" />
        <div className="card-body">
          <p className="card-text">Daniel Balogun</p>
          <p className="card-text"><strong>Property Interest: </strong>Land</p>
          <button className="btn w-100">View</button>
        </div>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="card">
        <img src={UserAgent2} className="card-img-top" alt="Agent" />
        <div className="card-body">
          <p className="card-text">Daniel Balogun</p>
          <p className="card-text"><strong>Property Interest: </strong>Land</p>
          <button className="btn w-100">View</button>
        </div>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="card">
        <img src={UserAgent3} className="card-img-top" alt="Agent" />
        <div className="card-body">
          <p className="card-text">Daniel Balogun</p>
          <p className="card-text"><strong>Property Interest: </strong>Land</p>
          <button className="btn w-100">View</button>
        </div>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="card">
        <img src={UserAgent3} className="card-img-top" alt="Agent" />
        <div className="card-body">
          <p className="card-text">Daniel Balogun</p>
          <p className="card-text"><strong>Property Interest: </strong>Land</p>
          <button className="btn w-100">View</button>
        </div>
      </div>
    </div>
  </div>
</div>

     
      </div>
    </div>
  );
};

export default Client;
