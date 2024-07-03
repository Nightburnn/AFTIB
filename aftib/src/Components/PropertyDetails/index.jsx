import React, { useEffect, useState } from "react";
import "./PropertyDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { fetchListingById } from "../../utils/adminOpsRequests";
import { useLoading } from "../LoadingContext";
import { createTransaction } from "../../utils/transactionRequests";
import { FaBath, FaBed } from "react-icons/fa";

const Index = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({});
  const { setLoading, setLoadingText } = useLoading();
  const [actionText, setActionText] = useState('');
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await fetchListingById(id);
        const data = response.listing;
        setListing(data);
        if (data.saleType === 'For Sale') {
          setActionText('Purchase This Property');
        } else if (data.saleType === 'For Rent') {
          setActionText('Rent This Property');
        } else {
          setActionText('Take This Short let');
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    getListing();
  }, [id]);

  const handleAction = async () => {
    const transactionType = listing.saleType === 'For Sale'
      ? 'propertyPurchase'
      : listing.saleType === 'For Rent'
      ? 'propertyRental'
      : 'propertyShortLet';

    try {
      setLoading(true);
      setLoadingText('Creating New Transaction. Please Wait...');
      const created = await createTransaction(listing._id, transactionType);
      setLoadingText('Created Successfully');
      navigate(`/viewNavigation/${created.transaction._id}?clientpov`);
    } catch (err) {
      console.error(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setLoadingText('');
      }, 3000);
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <div className="property-details-container container">
      <div className="property-details-header">
        <h2 className="property-title">{listing.title}</h2>
      </div>
      <div className="property-gallery">
        <div className="main-image">
          <img src={listing.images?.[selectedImage]} alt="Property" />
          <div className="image-count">{selectedImage + 1} / {listing.images?.length}</div>
          <button className="nav-button prev-button" onClick={prevImage}>❮</button>
          <button className="nav-button next-button" onClick={nextImage}>❯</button>
        </div>
      </div>
      <div className="property-price">
        <h3>Price: ${listing.price}</h3>
       
      </div>
      <div className="property-section">
            <p> <FaBath className="pp" />{listing.bathrooms}</p>
          </div>
          <div className="property-section">
            <p> <FaBed className="pp" /> {listing.bedrooms}</p>
          </div>
      <hr />
      <div className="property-address">
        <h3>Address</h3>
        <p>{listing.location}</p>
      </div>
      <div className="property-description">
        <h3>Description</h3>
        <p>{listing.description}</p>
      </div>
      
      <div className="row">
        <div className="property-amenities col-md-6">
          <h3>Amenities</h3>
          <ul>
            {listing.amenities?.length ? listing.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            )) : <li>No amenities listed</li>}
          </ul>
        </div>
        <div className="additional-info col-md-6">
          <h3>Additional Information</h3>
          <ul>
            <li><strong>Property Type:</strong> {listing.propertyType}</li>
            <li><strong>State:</strong> {listing.state}</li>
            <li><strong>LGA:</strong> {listing.LGA}</li>
            <li><strong>Size:</strong> {listing.size}m²</li>
            <li><strong>Year Built:</strong> {listing.yearBuilt}</li>
          </ul>
        </div>
      </div>
      
      <button className="property-action btn blue mb-4" onClick={handleAction}>{actionText}</button>

      <div className="row contact-form-container">
        <div className="contact-agent col-md-6">
          <h3>Contact Agent</h3>
          <div className="agent-details">
            <h4>{listing.agentData?.name}</h4>
            <p>{listing.agentData?.businessName}</p>
            <ul>
              <li><strong>Phone:</strong> {listing.agentData?.phone}</li>
              <li><strong>Mobile:</strong> {listing.agentData?.whatsappNo}</li>
            </ul>
          </div>
        </div>
        <div className="contact-form col-md-6">
          <h3>Contact the Agent</h3>
          <form>
            <input type="text" placeholder="Name *" required />
            <input type="email" placeholder="Email *" required />
            <textarea placeholder="Comment *" required></textarea>
            <button className="btn blue" type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
