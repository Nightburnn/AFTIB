import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import RoleListing from './RoleListing';

const ListingReview = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch listings for the user
    const fetchListings = async () => {
      // Fetch listings from the server based on user ID
      // Placeholder logic
      setListings([
        // Example data structure
        { propertyType: 'Type 1', sqt: '1000', status: 'pending' },
        { propertyType: 'Type 2', sqt: '1200', status: 'approved' }
      ]); // Replace this with the actual data
      setLoading(false);
    };

    if (user) {
      fetchListings();
    }
  }, [user]);

  const handleNewListing = (listingData) => {
    // Submit new listing with pending status
    const newListing = { ...listingData, status: 'pending' };
    setListings(prevListings => [...prevListings, newListing]);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (listings.length === 0 && !showForm) {
    return (
      <div>
        <h2>No Listings</h2>
        <button className="btn listbtn" onClick={() => setShowForm(true)}>Add Listing</button>
        {showForm && <RoleListing onSubmit={handleNewListing} />}
      </div>
    );
  }

  return (
    <div>
      <h2>Your Listings</h2>
      {listings.map((listing, index) => (
        <div key={index} className="listing-item">
          {/* Display listing details */}
          <p>{listing.propertyType}</p>
          <p>{listing.sqt}</p>
          <p>Status: {listing.status}</p>
          {/* Add more details as needed */}
        </div>
      ))}
      <button className="btn listbtn" onClick={() => setShowForm(true)}>Add Listing</button>
      {showForm && <RoleListing onSubmit={handleNewListing} />}
    </div>
  );
};

export default ListingReview;
