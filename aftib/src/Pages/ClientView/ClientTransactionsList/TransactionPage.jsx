import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const TransactionDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search);
  const clientPov = query.get("clientpov");

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/transactions/${id}`);
        setTransaction(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [id]);

  if (loading) {
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
            <p>Room: {transaction.bookingDetails.room}</p>
            <p>Start Date: {new Date(transaction.bookingDetails.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(transaction.bookingDetails.endDate).toLocaleDateString()}</p>
            <p>Total Nights: {transaction.bookingDetails.totalNights}</p>
            <p>Price: {transaction.bookingDetails.price}</p>
          </div>
        );
      case "propertyRental":
        return (
          <div>
            <h3>Rental Details</h3>
            <p>Start Date: {new Date(transaction.rentDetails.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(transaction.rentDetails.endDate).toLocaleDateString()}</p>
            <p>Total Months: {transaction.rentDetails.totalMonths}</p>
            <p>Price: {transaction.rentDetails.price}</p>
          </div>
        );
      case "propertyPurchase":
        return (
          <div>
            <h3>Purchase Details</h3>
            <p>Price: {transaction.purchaseDetails.price}</p>
          </div>
        );
      case "propertyShortLet":
        return (
          <div>
            <h3>Short Let Details</h3>
            {/* Render short let specific details here */}
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
      <p><strong>Remita One Time ID:</strong> {transaction.RemitaOneTimeID}</p>

      {transaction.transactionStatus === "pending" && clientPov && (
        <button className="btn btn-primary mt-3" onClick={beginPayment}>
          Proceed to Payment
        </button>
      )}
    </div>
  );
};

const beginPayment = async () => {
  console.log("beginning Payment");
  try {
    const transactionId = 'your_transaction_id_here'; // Replace with actual transaction ID
    const response = await axios.post(
      `${API_BASE_URL}/transactions/initialize-payment`,
      JSON.stringify({ transactionId }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("payment data retrieved successfully", response.data);

    function onSuccess() {
      console.log({ success: true });
      confirmPayment(transactionId);
    }

    function onError() {
      console.error({ error: true });
    }

    function onClose() {
      console.log({ closed: true });
    }

    const newPayment = window.RmPaymentEngine.init({
      ...response.data,
      onSuccess,
      onError,
      onClose,
    });

    newPayment.showPaymentWidget();
  } catch (error) {
    console.error("There was an error retrieving payment data", error);
  }
};

const confirmPayment = async (transactionId) => {
  console.log("beginning confirmation");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/transactions/check-rrr-payment-status`,
      JSON.stringify({ transactionId }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.error("There was an error retrieving payment data", error);
  }
};

export default TransactionDetails;
