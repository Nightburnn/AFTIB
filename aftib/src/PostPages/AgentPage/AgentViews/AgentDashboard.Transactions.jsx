import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import TransactionCard from "../../../Pages/ClientView/TransactionCard";

export function AgentTransactions() {
  let userData = useSelector((state) => state.user.userData);
  let transactions = userData.myTransactions;

  console.log({ transactions });
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
      <div className="row">
        <div className="col-12 col-lg-4 col-md-6 p-2">
          <TransactionCard
            date={transactionDetails.date}
            type={transactionDetails.type}
            transactionId={transactionDetails.transactionId}
            paymentInitialized={transactionDetails.paymentInitialized}
            onViewTransaction={handleViewTransaction}
          />
        </div>
        <div className="col-12 col-lg-4 col-md-6 p-2">
          <TransactionCard
            date={transactionDetails.date}
            type={transactionDetails.type}
            transactionId={transactionDetails.transactionId}
            paymentInitialized={transactionDetails.paymentInitialized}
            onViewTransaction={handleViewTransaction}
          />
        </div>
        <div className="col-12 col-lg-4 col-md-6 p-2">
          <TransactionCard
            date={transactionDetails.date}
            type={transactionDetails.type}
            transactionId={transactionDetails.transactionId}
            paymentInitialized={transactionDetails.paymentInitialized}
            onViewTransaction={handleViewTransaction}
          />
        </div>
      </div>
    </div>
  );
}
