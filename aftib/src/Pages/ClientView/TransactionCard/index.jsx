import React from "react";
import "./style.css"; // Import the CSS file for styling

const TransactionCard = ({
  type,
  transactionId,
  title,
  onViewTransaction,
}) => {
  let message;
  let displayType;
  if(type === 'propertyPurchase'){
    message = 'Transaction for the Purchase of a property'
    displayType = 'Property Purchase'
  }
  else if(type === 'propertyRental'){
    message = 'Transaction for the Rental of a property'
    displayType = 'Property Rental'
  }
  else if(type === 'propertyShortLet') {
    message = 'Transaction for the Shortlet of a property'
    displayType = 'Property ShortLet'
  }
  else {
    message = 'Transaction for a hotel reservation'
    displayType = 'Hotel Reservation'
  }
  return (
    <div className="transaction-card">
    <div className="transaction-field">
      <span className="field-name">Type:</span>
      <span className="field-value">{displayType}</span>
    </div>
      <div className="transaction-field">
        <span className="field-name">Details:</span>
        <span className="field-value">{message}</span>
      </div>
      <div className="transaction-field">
        <span className="field-name">Title:</span>
        <span className="field-value">{title}</span>
      </div>
      <div className="transaction-field">
        <span className="field-name">Transaction ID:</span>
        <span className="field-value">{transactionId}</span>
      </div>
      <button className="view-transaction-button" onClick={()=>{onViewTransaction(transactionId)}}>
        View Transaction
      </button>
    </div>
  );
};

export default TransactionCard;
