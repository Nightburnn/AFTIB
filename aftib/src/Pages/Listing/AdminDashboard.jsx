import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';

const AdminListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all listings for admin
    const fetchListings = async () => {
      // Fetch listings from the server
      // Placeholder logic
      setListings([]); // Replace this with the actual data
      setLoading(false);
    };

    if (user && user.role === 'admin') {
      fetchListings();
    }
  }, [user]);

  const handleApprove = (listingId) => {
    // Approve listing
    setListings(prevListings => prevListings.map(listing => 
      listing.id === listingId ? { ...listing, status: 'approved' } : listing
    ));
  };

  const handleReject = (listingId) => {
    // Reject listing
    setListings(prevListings => prevListings.map(listing => 
      listing.id === listingId ? { ...listing, status: 'rejected' } : listing
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Admin Listings</h2>
      {listings.map((listing, index) => (
        <div key={index} className="listing-item">
          {/* Display listing details */}
          <p>{listing.propertyType}</p>
          <p>{listing.sqt}</p>
          <p>Status: {listing.status}</p>
          {/* Add more details as needed */}
          <button onClick={() => handleApprove(listing.id)}>Approve</button>
          <button onClick={() => handleReject(listing.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminListings;
