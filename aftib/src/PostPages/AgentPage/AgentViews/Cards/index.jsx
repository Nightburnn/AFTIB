import React from "react";
import "./style.css"; // Import the CSS file for styling

const ListingCard = ({
  image,
  title,
  date,
  address,
  message,
  onViewListing,
  buttonText,
}) => {
  return (
    <div className="listing-card">
      <div className="image-container">
        <img src={image} alt={title} className="listing-image" />
      </div>
      <div className="data-container">
        <div className="listing-field">
          <span className="field-name">Title:</span>
          <span className="field-value">{title}</span>
        </div>
        <div className="listing-field">
          <span className="field-name">Date:</span>
          <span className="field-value">{date}</span>
        </div>
        <div className="listing-field">
          <span className="field-name">Location:</span>
          <span className="field-value">{address}</span>
        </div>
        <p>{message}</p>
        <button className="view-listing-button" onClick={onViewListing}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export const ListingCard1 = ({
  image,
  title,
  address,
  onViewListing,
  onEditListing,
  viewText
}) => {
  return (
    <div className="listing-card">
      <div className="image-container">
        <img src={image} alt={title} className="listing-image" />
      </div>
      <div className="data-container py-3">
        <div className="listing-field">
          <span className="field-name">Title:</span>
          <span className="field-value">{title}</span>
        </div>
        <div className="listing-field">
          <span className="field-name">Location:</span>
          <span className="field-value">{address}</span>
        </div>
        <i style={{color: 'green'}}>Approved</i>
        <button className="view-listing-button" onClick={onViewListing}>
          {viewText}
        </button>
        <button className="view-listing-button" onClick={onEditListing}>
          Edit
        </button>
      </div>
    </div>
  );
};
export const ListingCard2 = ({
  image,
  title,
  address,
  onViewListing,
  onEditListing,
  viewText
}) => {
  return (
    <div className="listing-card">
      <div className="image-container">
        <img src={image} alt={title} className="listing-image" />
      </div>
      <div className="data-container py-3">
        <div className="listing-field">
          <span className="field-name">Title:</span>
          <span className="field-value">{title}</span>
        </div>
        <div className="listing-field">
          <span className="field-name">Location:</span>
          <span className="field-value">{address}</span>
        </div>
        <i style={{color: 'pink'}}>Pending</i>
        <button className="view-listing-button" onClick={onViewListing}>
          {viewText}
        </button>
        <button className="view-listing-button" onClick={onEditListing}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
