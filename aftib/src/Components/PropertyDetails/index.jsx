import React, { useEffect, useState } from "react";
import "./PropertyDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { fetchListingById, sendContactForm } from "../../utils/adminOpsRequests";
import { useLoading } from "../LoadingContext";
import { createTransaction } from "../../utils/transactionRequests";
import { FaBath, FaBed } from "react-icons/fa";
import Modal from "./Modal"; // Adjust the path as needed

const Index = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({});
  const { setLoading, setLoadingText } = useLoading();
  const [actionText, setActionText] = useState('');
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const [rentDate, setRentDate] = useState(new Date());
  const [shortletDate, setShortletDate] = useState(new Date());
  const [shortletDuration, setShortletDuration] = useState(1);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ success: false, message: '' });

  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await fetchListingById(id);
        const data = response.listing;
        setListing(data);
        if (data.saleType === 'For Sale') {
          setActionText('Purchase This Property');
        } else if (data.saleType === 'For Rent') {
          setActionText('Proceed To Rent Property');
        } else {
          setActionText('Take This Short let');
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getListing();
  }, [id]);

  async function handleAction() {
    let transactionType;
    let rentDetails = {
      startDate: '', // Start date of the rental
      totalMonths: 12, // Total number of months for the rental
      monthlyPayment: 0, // Total price of the rental
      totalPrice: 0
    };
    let shortLetDetails = {
      startDate: '', // Start date of the rental
      totalMonths: 0, // Total number of months for the shortlet
      monthlyPayment: 0, // Total price of the rental
      totalPrice: 0
    };
    let bookingDetails = {};
    if (listing.saleType === 'For Sale') {
      transactionType = 'propertyPurchase';
    } else if (listing.saleType === 'For Rent') {
      transactionType = 'propertyRental';
      rentDetails = {
        startDate: rentDate, // Start date of the rental
        totalMonths: 12, // Total number of months for the rental
        monthlyPayment: listing.monthlyRentPayment, // Total price of the rental
        totalPrice: listing.monthlyRentPayment * 12
      };
    } else {
      transactionType = 'propertyShortLet';
      shortLetDetails = {
        startDate: shortletDate, // Start date of the rental
        totalDays: shortletDuration, // Total number of months for the rental
        monthlyPayment: listing.dailyShortLetPrice, // Total price of the shortlet
        totalPrice: listing.dailyShortLetPrice * shortletDuration
      };
    }
    try {
      setLoading(true);
      setLoadingText('Creating New Transaction. Please Wait...');
      let created = await Promise.resolve(createTransaction({ propertyId: listing._id, transactionType, rentDetails, shortLetDetails, bookingDetails }));
      setLoadingText('Created Successfully', created);
      navigate(`/viewTransaction/${created.transaction.transactionId}?clientpov=true`);
    } catch (err) {
      console.error(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setLoadingText('');
      }, 3000);
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactForm(formData.name, formData.email, formData.message);
      setFormStatus({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      setFormStatus({ success: false, message: 'Failed to send message.' });
    }
    setModalMessage(formStatus.message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalMessage('');
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
        <h3>Price: NGN {listing.price}</h3>
      </div>
      <div className="property-section">
        <p> <FaBath className="pp" />{listing.bathrooms} Bathrooms Available</p>
      </div>
      <div className="property-section">
        <p> <FaBed className="pp" /> {listing.bedrooms} Bedrooms Available</p>
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
        <div className="additional-info ">
          <h3>Additional Information</h3>
          <ul>
            <li><strong>Property Type:</strong> {listing.propertyType}</li>
            <li><strong>State:</strong> {listing.state}</li>
            <li><strong>LGA:</strong> {listing.LGA}</li>
            <li><strong>Size:</strong> {listing.size}sqt</li>
            <li><strong>Year Built:</strong> {listing.yearBuilt}</li>
          </ul>
        </div>
      </div>
      <div className="my-3" />
      <div className="action section">
        <div>
          {listing?.saleType == 'For Rent' ? (
            <div>
              <h4>Rent Details</h4>
              <p><b>Monthly Rent Payment :</b> {listing.monthlyRentPayment}</p>
              <p><b>Total Price :</b> {listing.monthlyRentPayment * 12}</p>
              <p><b>Your Short Let would start on :</b> {rentDate.toString()}</p>
              <p><b>Pick Another Date to Begin your rent.</b></p>
              <p><input type="date" value={rentDate} onChange={(e) => { setRentDate(e.target.value) }} /></p>
            </div>
          ) : null}
        </div>
        <div>
          {listing?.saleType == 'Short Let' ? (
            <div>
              <h4>Short Let Details</h4>
              <p><b>Price Per Day :</b> {listing.dailyShortLetPrice}</p>
              <p><b>Total Price :</b> {listing.dailyShortLetPrice * shortletDuration}</p>
              <p><b>Your Short Let would start on :</b> {shortletDate.toString()}</p>
              <p><b>Pick Another Date to Begin your Short Let.</b></p>
              <p><input type="date" value={shortletDate} onChange={(e) => { setShortletDate(e.target.value) }} /></p>
              <p><b>Choose the number of days you want to rent for.</b></p>
              <select onChange={e => setShortletDuration(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
          ) : null}
        </div>
        <div className="my-3" />
        <button style={{ width: '70%', padding: '20px', display: 'block', margin: '0px auto' }} className="property-action btn blue mb-4" onClick={handleAction}>{actionText}</button>
      </div>
      <div className="row contact-form-container">
        <div className="contact-agent col-md-6">
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
          <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="Name *" required value={formData.name} onChange={handleFormChange} />
            <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleFormChange} />
            <textarea name="message" placeholder="Comment *" required value={formData.message} onChange={handleFormChange}></textarea>
            <button className="btn blue" type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
};

export default Index;
