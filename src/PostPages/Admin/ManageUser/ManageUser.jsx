import React from 'react';
import sh3 from '../../../assets/images/sh3.png';


const users = [
  {
    id: '#C01234',
    name: 'Robert Patilson',
    joinDate: '26/04/2020, 12:42 AM',
    location: 'TY35 Avenue GGLondon Center',
    phone: '+51 1234 5678',
    email: 'info@example.com',
    imgSrc: sh3
  },
  {
    id: '#C01235',
    name: 'Jane Doe',
    joinDate: '15/03/2019, 11:15 AM',
    location: '21B Baker Street, London',
    phone: '+44 207 123 4567',
    email: 'jane.doe@example.com',
    imgSrc: sh3
  },
  // Add more users here
];

const UserCard = ({ user }) => (
    <div className="card mb-4 manage">
    <div className="card-body p-0">
      <div className="row border-bottom mx-0 pt-4 px-2 align-items-center">
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-12 mb-sm-4 mb-3 align-items-center media">
          <img
            className="me-sm-4 me-3 img-fluid rounded"
            width="90"
            src={user.imgSrc}
            alt={user.name}
          />
          <div className="media-body">
            <span className="text-primary d-block">{user.id}</span>
            <h4 className="mb-1">{user.name}</h4>
            <span className="d-block mb-lg-0 mb-0">Join on {user.joinDate}</span>
          </div>
        </div>
        <div className="col-xl-2 col-xxl-2 col-lg-3 col-sm-4 mb-sm-4 col-6 mb-3">
          <small className="mb-2 d-block">Location</small>
          <span className="text-black font-w600">{user.location}</span>
        </div>
        <div className="col-xl-2 col-xxl-3 col-lg-3 col-sm-4 mb-sm-4 col-6 mb-3 text-lg-center">
          <small className="mb-2 d-block">Phone Number</small>
          <span className="text-black font-w600">{user.phone}</span>
        </div>
        <div className="col-xl-2 col-xxl-3 col-lg-6 col-sm-4 mb-sm-4 mb-3">
          <small className="mb-2 d-block">Email Address</small>
          <span className="text-black font-w600">{user.email}</span>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6 mb-sm-4 mb-4 d-flex">
          <div className="mt-auto mb-auto me-auto">
            <button className="btn btn-outline-primary rounded"  aria-expanded="false">
              View
            </button>
          </div>
          <div className="dropdown ms-4 mt-auto mb-auto">
            <button className="btn btn-link" data-bs-toggle="dropdown">
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                  <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                  <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                </g>
              </svg>
            </button>
            <div className="dropdown-menu dropdown-menu-end">
              <a className="dropdown-item" >Edit</a>
              <a className="dropdown-item text-danger" >Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const ManageUser = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="col-xl-12">
        <div className=" ">
          <div className="card-body p-0">
            {users.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ManageUser;
