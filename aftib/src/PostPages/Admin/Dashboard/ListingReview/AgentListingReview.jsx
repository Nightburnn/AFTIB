import React from 'react';
import './AgentListingReview.css';
import { Link } from 'react-router-dom';



const AgentListingReview = () => {
  const listings = [
    { id: 1, title: 'A 2 bedroom flat in lekki phase 2', agent: 'Angelica Baker', listedAs: 'For Rent' },
    { id: 2, title: 'A 2 bedroom flat in lekki phase 2', agent: 'Angelica Baker', listedAs: 'For Sale' },
    { id: 3, title: 'A 2 bedroom flat in lekki phase 2', agent: 'Angelica Baker', listedAs: 'Short Let' },
    { id: 4, title: 'A 2 bedroom flat in lekki phase 2', agent: 'Angelica Baker', listedAs: 'For Rent' },
    { id: 5, title: 'A 2 bedroom flat in lekki phase 2', agent: 'Angelica Baker', listedAs: 'For Sale' },
    { id: 6, title: 'A 2 bedroom flat in lekki phase 2', agent: 'Angelica Baker', listedAs: 'For Rent' },
  ];

  return (
    <div className="container mt-3 alr">
      <div className="py-4 agent">
        <h1 className="text-center">Pending New Listings</h1>
        <h3 className="text-center">Review the pending listings below for approval.</h3>
      </div>
      <div className="row mt-4">
        {listings.map(listing => (
          <div key={listing.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <img 
                  src="https://via.placeholder.com/50"
                  className="rounded-circle" 
                  alt="Listing"
                />
                <div>
                  <h5 className="card-title">{listing.title}</h5>
                  <p className="card-text"><strong>Agent:</strong> {listing.agent}</p>
                  <p className="card-text"><strong>Listed As:</strong> {listing.listedAs}</p>
                </div>
              </div>
              <div className="px-3 pb-3">
                <Link to="/alrdetails" className="btn blue btn-block">Review The Listing</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default AgentListingReview;
