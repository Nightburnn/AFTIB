import React, { useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../../../../Pages/ClientView/TransactionCard";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const [showDetails, setShowDetails] = useState(false);
  let navigate = useNavigate()
  let dashboardData = useSelector((state) => state.user.adminDashboardData);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  console.log(dashboardData)
  const handleViewTransaction = (id) => {
    // Handle the view transaction logic here
    console.log(
      "View Transaction clicked for ID:",id
    );
    navigate(`/viewTransaction/${id}`)
  }

  const transactions = [
    {
      date: "12/07/24",
      type: "Property Purchase",
      transactionId: "92039239480fj2fj3",
      paymentInitialized: true,
      agentName: "Anne Marley",
      agentPhone: "9084838294",
      agentEmail: "anne@me.com",
      clientName: "Anne Marley",
      clientPhone: "9084838294",
      clientEmail: "anne@me.com",
      transactionType: "Hotel Booking",
      transactionDate: "12/07/12",
      hotelName: "name / title of the hotel/listing",
      hotelAddress: "address of the hotel / listing",
    },

    {
      date: "12/07/24",
      type: "Property Purchase",
      transactionId: "92039239480fj2fj3",
      paymentInitialized: true,
      agentName: "Anne Marley",
      agentPhone: "9084838294",
      agentEmail: "anne@me.com",
      clientName: "Anne Marley",
      clientPhone: "9084838294",
      clientEmail: "anne@me.com",
      transactionType: "Hotel Booking",
      transactionDate: "12/07/12",
      hotelName: "name / title of the hotel/listing",
      hotelAddress: "address of the hotel / listing",
    },

    {
      date: "12/07/24",
      type: "Property Purchase",
      transactionId: "92039239480fj2fj3",
      paymentInitialized: true,
      agentName: "Anne Marley",
      agentPhone: "9084838294",
      agentEmail: "anne@me.com",
      clientName: "Anne Marley",
      clientPhone: "9084838294",
      clientEmail: "anne@me.com",
      transactionType: "Hotel Booking",
      transactionDate: "12/07/12",
      hotelName: "name / title of the hotel/listing",
      hotelAddress: "address of the hotel / listing",
    },
  ];


  return (
    <div className="container mt-3 transcat">
      <div className="py-4 agent">
        <h1 className="text-center">Pending Transactions</h1>
      </div>
      <div className="row">
        {
          dashboardData.transactions.map(x=>{
            return (
              <div className="col-12">
                <TransactionCard
                  type={x.transactionType}
                  transactionId={x.transactionId}
                  title={x.narration}
                  onViewTransaction={handleViewTransaction}
                  status={x.transactionStatus}
                />                  
              </div>
          )
         
          })
        }
      </div>
    </div>
  );
};
export default Transaction;
