import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../../../Components/LoadingContext';
import { fetchListingById } from '../../../../utils/adminOpsRequests';

const Valdetails = () => {
  const { id } = useParams();
  let token = window.localStorage.getItem('accessToken');
  let { setLoading, setLoadingText } = useLoading();
  const [listing, setListing] = useState(null);

  async function fetchListing() {
    try {
      setLoading(true);
      setLoadingText('Fetching Listing Information');
      console.log('Fetching listing with ID:', id);
      const fetchedListing = await fetchListingById(id);
      setListing(fetchedListing);
    } catch (err) {
      console.error('Error fetching listing:', err.message);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  }

  useEffect(() => {
    fetchListing();
  }, []);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="py-2 agent">
        <h1 className="text-center">Listing Details</h1>
      </div>

      <div className="row mt-4">
        <div className="section border">
          <h2 className="text-center">Main Information</h2>
          <div className="info-agent">
            <p><strong>Title:</strong> {listing.title}</p>
            <p><strong>Description:</strong> {listing.description}</p>
            <p><strong>Property:</strong> {listing.saleType}</p>
            <p><strong>Property Type:</strong> {listing.propertyType}</p>
            <p><strong>Size:</strong> {listing.size} sqm</p>
            <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {listing.bathrooms}</p>
            <p><strong>Estate:</strong> {listing.estate}</p>
            <p><strong>Year Built:</strong> {listing.yearBuilt}</p>
            <hr className='mr-4' />
            <p><strong>Pricing Information:</strong> Monthly Rent: {listing.monthlyRentPayment}</p>
            <p><strong>Full Address:</strong> {listing.location}</p>
            <p><strong>State:</strong> {listing.state}</p>
            <p><strong>LGA:</strong> {listing.LGA}</p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Contact Information</h2>
          <div className="info-agent">
            <p><strong>Agent Name:</strong> {listing.agentContact?.name}</p>
            <p><strong>Agent Phone:</strong> {listing.agentContact?.phone}</p>
            <p><strong>Agent Email:</strong> {listing.agentContact?.email}</p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Property Images</h2>
          <div className="text-center d-flex alr-image-container">
            {listing.images?.map((image, index) => (
              <img src={image} key={index} className="alr-id" alt={`Property ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Owner's Information</h2>
          <div className="info-agent">
            <p><strong>Owner Name:</strong> {listing.ownersContact?.name}</p>
            <p><strong>Owner Phone:</strong> {listing.ownersContact?.phone}</p>
            <p><strong>Owner Email:</strong> {listing.ownersContact?.email}</p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Approval Section</h2>
          <p className="text-center">
          Are you sure you want to delete this listing? This action cannot be undone.
          </p>
          <div className="text-center">
            <button  className="btn danger approval-btn">Delete this Listing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Valdetails;
