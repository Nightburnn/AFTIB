import React from 'react';
import './HotelListingReview.css'
import { Link } from 'react-router-dom';

const HotelListingReview = () => {
  const listings = [
    { id: 1, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Hotel' },
    { id: 2, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Hotel' },
    { id: 3, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Hotel' },
    { id: 4, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Listing' },
    { id: 5, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Listing' },
    { id: 6, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Listing' },
    { id: 7, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Listing' },
    { id: 8, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Listing' },
    { id: 9, title: 'Eko Hotel Luxury Suites', agent: 'Angelica Baker', listedAs: 'Review The Listing' },
  ];

  return (
    <div className="container hlr mt-3">
      <div className="py-4 agent">
        <h1 className="text-center">Review New Hotels</h1>
        <h3 className="text-center">Below are the list new listings that needs to be reviewed.</h3>
      </div>
      <div className="row mt-4">
        {listings.map(listing => (
          <div key={listing.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
                <p className="card-text"><strong>Agent:</strong> {listing.agent}</p>
              </div>
              <div className="px-3 pb-3">
                <Link to="/hlrdetails" className="btn blue btn-block">{listing.listedAs}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelListingReview;
