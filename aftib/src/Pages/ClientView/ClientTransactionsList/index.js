import React, { useState, useEffect } from "react";
import { useLoading } from "../../../Components/LoadingContext";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import TransactionCard from "../TransactionCard";

export function ClientTransactionList() {
  let { setLoading, setLoadingText } = useLoading();
  let userData = useSelector((state) => state.userData);
  console.log({ userData });
  const transactionDetails = {
    date: "2023-06-29",
    type: "Purchase",
    transactionId: "TXN123456789",
    paymentInitialized: "Yes",
  };

  const handleViewTransaction = () => {
    // Handle the view transaction logic here
    console.log(
      "View Transaction clicked for ID:",
      transactionDetails.transactionId,
    );
  };
  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Transactions</h1>
        <h3 className="text-center">This is a list of your transactions.</h3>
      </div>
      <div>
        <TransactionCard
          date={transactionDetails.date}
          type={transactionDetails.type}
          transactionId={transactionDetails.transactionId}
          paymentInitialized={transactionDetails.paymentInitialized}
          onViewTransaction={handleViewTransaction}
        />
      </div>
    </div>
  );
}
