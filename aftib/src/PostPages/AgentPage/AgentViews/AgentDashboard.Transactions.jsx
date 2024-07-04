import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import TransactionCard from "../../../Pages/ClientView/TransactionCard";

export function AgentTransactions() {
  let userData = useSelector((state) => state.user.userData);
  let transactions= userData.myTransactions
  let navigate = useNavigate()

  const handleViewTransaction = (id) => {
    // Handle the view transaction logic here
    console.log(
      "View Transaction clicked for ID:",id
    );
    navigate(`/viewTransaction/${id}`)
  }

  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Transactions</h1>
        <h3 className="text-center">This is a list of your transactions.</h3>
      </div>
      <div className="row">
      <div className="row">
        {
          transactions.map(x=>{
            return (
              <div className="col-12 col-lg-6">
                <TransactionCard
                  type={x.transactionType}
                  transactionId={x.transactionId}
                  title={x.title}
                  onViewTransaction={handleViewTransaction}
                  status={x.status}
                />                  
              </div>
          )
         
          })
        }
      </div>
      </div>
    </div>
  );
}
