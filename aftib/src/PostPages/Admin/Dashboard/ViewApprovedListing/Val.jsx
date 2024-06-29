import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../../../../Components/LoadingContext';

// Dummy data for testing
const dummyListings = [
  {
    _id: '1',
    title: 'Beautiful Home in Suburbia',
    location: 'Suburbia, City A',
    saleType: 'Sale',
  },
  {
    _id: '2',
    title: 'Cozy Apartment Downtown',
    location: 'Downtown, City B',
    saleType: 'Rent',
  },
];

const Val = () => {
  let { setLoading, setLoadingText } = useLoading();
  let [unapprovedListings, setUnapprovedListings] = useState([]);

  async function fetchListings() {
    try {
      setLoading(true);
      setLoadingText('Fetching Agent Listings');
      // Simulate API call delay for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Replace with actual fetchUnapprovedListings() when integrating with backend
      // let response = await fetchUnapprovedListings();
      // setUnapprovedListings(response.listingsData);
      setUnapprovedListings(dummyListings); // Set dummy data
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="container mt-3 alr">
      <div className="py-4 agent">
        <h1 className="text-center">Approved Listings</h1>
        <h3 className="text-center">Review the approved listings below.</h3>
      </div>
      <div className="row mt-4">
        {unapprovedListings.map(listing => (
          <div key={listing._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="https://via.placeholder.com/150"
                  className="rounded-circle"
                  alt="Listing"
                />
                <div>
                  <h5 className="card-title">{listing.title}</h5>
                  <p className="card-text"><strong>Location:</strong> {listing.location}</p>
                  <p className="card-text"><strong>Listed As:</strong> {listing.saleType}</p>
                </div>
              </div>
              <div className="px-3 pb-3">
                <Link to='/valdetails' className="btn blue btn-block">View Listing</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Val;
