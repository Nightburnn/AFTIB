import React, { useState, useEffect } from "react";
import { useLoading } from "../../../Components/LoadingContext";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import TransactionCard from "../TransactionCard";
import { useNavigate } from "react-router-dom";

export function ClientTransactionList() {
  let { setLoading, setLoadingText } = useLoading();
  let navigate = useNavigate()
  let userData = useSelector((state) => state.user.userData);
  let [transactions,setTransactions] = useState(userData.myTransactions)
  console.log('transactions', userData.myTransactions)
  const handleViewTransaction = (id) => {
    // Handle the view transaction logic here
    console.log(
      "View Transaction clicked for ID:",id
    );
    navigate(`/viewNavigation/${id}`)
  };
  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Transactions</h1>
        <h3 className="text-center">This is a list of your transactions.</h3>
      </div>
      <div>
        {
          transactions.map(x=>{
            return (
            <TransactionCard
            date={'20-2-3'}
              type={x.transactionType}
              transactionId={x.transactionId}
              title={x.title}
              onViewTransaction={handleViewTransaction}
            />   
          )
         
          })
        }

      </div>
    </div>
  );
}
