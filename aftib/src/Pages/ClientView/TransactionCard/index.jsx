import React from 'react';
import './style.css'; // Import the CSS file for styling

const TransactionCard = ({ date, type, transactionId, paymentInitialized, onViewTransaction }) => {
  return (
    <div className="transaction-card">
      <div className="transaction-field">
        <span className="field-name">Date:</span>
        <span className="field-value">{date}</span>
      </div>
      <div className="transaction-field">
        <span className="field-name">Type:</span>
        <span className="field-value">{type}</span>
      </div>
      <div className="transaction-field">
        <span className="field-name">Transaction ID:</span>
        <span className="field-value">{transactionId}</span>
      </div>
      <div className="transaction-field">
        <span className="field-name">Payment Initialized:</span>
        <span className="field-value">{paymentInitialized}</span>
      </div>
      <button className="view-transaction-button" onClick={onViewTransaction}>
        View Transaction
      </button>
    </div>
  );
};

export default TransactionCard;
