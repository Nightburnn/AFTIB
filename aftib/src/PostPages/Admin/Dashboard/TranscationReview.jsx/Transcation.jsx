import React, { useState } from 'react';
import './Transaction.css';

const Transaction = () => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
  
    const transactions = [
      {
        date: '12/07/24',
        type: 'Property Purchase',
        transactionId: '92039239480fj2fj3',
        paymentInitialized: true,
        agentName: 'Anne Marley',
        agentPhone: '9084838294',
        agentEmail: 'anne@me.com',
        clientName: 'Anne Marley',
        clientPhone: '9084838294',
        clientEmail: 'anne@me.com',
        transactionType: 'Hotel Booking',
        transactionDate: '12/07/12',
        hotelName: 'name / title of the hotel/listing',
        hotelAddress: 'address of the hotel / listing',
      },

      {
        date: '12/07/24',
        type: 'Property Purchase',
        transactionId: '92039239480fj2fj3',
        paymentInitialized: true,
        agentName: 'Anne Marley',
        agentPhone: '9084838294',
        agentEmail: 'anne@me.com',
        clientName: 'Anne Marley',
        clientPhone: '9084838294',
        clientEmail: 'anne@me.com',
        transactionType: 'Hotel Booking',
        transactionDate: '12/07/12',
        hotelName: 'name / title of the hotel/listing',
        hotelAddress: 'address of the hotel / listing',
      },

      {
        date: '12/07/24',
        type: 'Property Purchase',
        transactionId: '92039239480fj2fj3',
        paymentInitialized: true,
        agentName: 'Anne Marley',
        agentPhone: '9084838294',
        agentEmail: 'anne@me.com',
        clientName: 'Anne Marley',
        clientPhone: '9084838294',
        clientEmail: 'anne@me.com',
        transactionType: 'Hotel Booking',
        transactionDate: '12/07/12',
        hotelName: 'name / title of the hotel/listing',
        hotelAddress: 'address of the hotel / listing',
      },
    ];
  
    return (
      <div className="container mt-3 transcat">
            <div className="py-4 agent">
        <h1 className="text-center">Pending Transactions</h1>
      </div>
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-card mb-4 mt-4">
            <div className="p-3">
              <div className="d-flex justify-content-between mb-2">
                <strong>Date:</strong> <span>{transaction.date}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <strong>Type:</strong> <span>{transaction.type}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <strong>Transaction ID:</strong> <span>{transaction.transactionId}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <strong>Payment Initialized:</strong> <span>{transaction.paymentInitialized ? 'True' : 'False'}</span>
              </div>
            </div>
            <div className="text-center">
              <button className="details-btn" onClick={toggleDetails}>
                Details {showDetails ? '▲' : '▼'}
              </button>
            </div>
            {showDetails && (
              <div className="details-section p-3">
                <div>
                  <h5>Agent Informations (name, phone, email)</h5>
                  <p><strong>Name:</strong> {transaction.agentName}</p>
                  <p><strong>Phone:</strong> {transaction.agentPhone}</p>
                  <p><strong>Email:</strong> {transaction.agentEmail}</p>
                </div>
                <div>
                  <h5>Client’s Informations</h5>
                  <p><strong>Name:</strong> {transaction.clientName}</p>
                  <p><strong>Phone:</strong> {transaction.clientPhone}</p>
                  <p><strong>Email:</strong> {transaction.clientEmail}</p>
                </div>
                <div>
                  <h5>Transaction Details</h5>
                  <p><strong>Type:</strong> {transaction.transactionType}</p>
                  <p><strong>Date:</strong> {transaction.transactionDate}</p>
                  <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                </div>
                <div>
                  <h5>Hotel Information / Listing Information</h5>
                  <p><strong>Name/Title:</strong> {transaction.hotelName}</p>
                  <p><strong>Address:</strong> {transaction.hotelAddress}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
export default Transaction;
