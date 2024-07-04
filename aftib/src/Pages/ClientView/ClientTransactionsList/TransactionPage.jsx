import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchTransactionById } from "../../../utils/transactionRequests";
import { useLoading } from "../../../Components/LoadingContext";
import { beginPayment } from "../../../utils/transactionRequests";
const TransactionDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  let {setLoading,setLoadingText} = useLoading()
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
    const [loadingState,setLoadingState] = useState(true)
  const query = new URLSearchParams(location.search);
  const clientPov = !!query.get("clientpov");
  useEffect(() => {
    setLoading(true)
    const getTransaction = async () => {
      try {
        const data = await fetchTransactionById(id);
        console.log({transaction: data})
        setTransaction(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingState(false)
      }
    };
    getTransaction();
  }, []);


  if (loadingState) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transaction) {
    return <div>No transaction found</div>;
  }

  const renderDetails = () => {
    switch (transaction.transactionType) {
      case "hotelBooking":
        return (
          <div>
            <h3>Booking Details</h3>
            <p><b>Room Type: {transaction.bookingDetails.room.roomType}</b></p>
            <p>Check In Date: {new Date(transaction.bookingDetails.checkInDate).toLocaleDateString()}</p>
            <p>Check Out Date: {new Date(transaction.bookingDetails.checkOutDate).toLocaleDateString()}</p>
            <p>Total Nights: {transaction.bookingDetails.totalNights}</p>
            <p>Price NGN: {transaction?.bookingDetails?.totalPrice}</p>
          </div>
        );
      case "propertyRental":
        return (
          <div>
            <h3>Rental Details</h3>
            <p><b>Start Date:</b> {new Date(transaction.rentDetails.startDate).toLocaleDateString()}</p>
            <p><b>Total Months:</b> {transaction.rentDetails.totalMonths} Months</p>
            <p><b>Price:</b>NGN {transaction?.rentDetails?.totalPrice || 'Check RRR on remita for the total price'}</p>
          </div>
        );
      case "propertyPurchase":
        return (
          <div>
            <h3>Purchase Details</h3>
            <p><b>Price:</b>NGN {transaction?.purchaseDetails?.price || "Check RRR on remita for the price"}</p>
          </div>
        );
      case "propertyShortLet":
        return (
          <div>
            <h3>Short Let Details</h3>
            <div>
            <p><b>Start Date:</b> {new Date(transaction.shortLetDetails.startDate).toLocaleDateString()}</p>
            <p><b>Total Months:</b> {transaction.shortLetDetails.totalMonths} Months</p>
            <p><b>Price:</b>NGN {transaction?.shortLetDetails?.totalPrice || 'Check RRR on remita for the total price'}</p>
          </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <h2>Transaction Details</h2>
      <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
      <p><strong>Client ID:</strong> {transaction.clientId}</p>
      <p><strong>Provider ID:</strong> {transaction.providerId}</p>
      <p><strong>Transaction Type:</strong> {transaction.transactionType}</p>
      <p><strong>Transaction Status:</strong> {transaction.transactionStatus}</p>
      <p><strong>Payment Status:</strong> {transaction.paymentStatus}</p>
      <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
      {transaction.propertyId && <p><strong>Property ID:</strong> {transaction.propertyId}</p>}
      {transaction.hotelId && <p><strong>Hotel ID:</strong> {transaction.hotelId}</p>}
      {renderDetails()}
      <p><strong>Narration:</strong> {transaction.narration}</p>
      <p><strong>RRR:</strong> {transaction.RRR}</p>
      {transaction.transactionStatus === "pending" && clientPov ? (
        <button className="btn btn-primary mt-3" onClick={()=>{beginPayment(id)}}>
          Proceed to Payment
        </button>
      ): null}
    </div>
  );
};


export default TransactionDetails;
