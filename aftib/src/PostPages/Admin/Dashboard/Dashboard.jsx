import React from 'react'
import './Dash.css'
import { TfiPrinter } from "react-icons/tfi";

const approvalAndReviewData = [
  { icon: <TfiPrinter />, number: "2,345", title: "Agent", buttonText: "Review Request" },
  { icon: <TfiPrinter />, number: "2,345", title: "New Listing Pending", buttonText: "Review Listings" },
  { icon: <TfiPrinter />, number: "2,345", title: "New Hotel Listing", buttonText: "Review Hotels" },
  { icon: <TfiPrinter />, number: "2,345", title: "Pending Transactions", buttonText: "Review Request" },
];

const statisticsAndInfoData = [
  { icon: <TfiPrinter />, number: "2,345", title: "Approved Agent", buttonText: "View Data" },
  { icon: <TfiPrinter />, number: "2,345", title: "Client Account", buttonText: "View Data" },
  { icon: <TfiPrinter />, number: "2,345", title: "Approved Listings", buttonText: "View Data" },
  { icon: <TfiPrinter />, number: "2,345", title: "Approved Hotels", buttonText: "View Data" },
  { icon: <TfiPrinter />, number: "2,345", title: "Concluded Transactions", buttonText: "View Data" },
];

const Dashboard = () => {
  return (
    <div className="dash">
      <div className="container">
        <h1 className="my-4">Admin Dashboard</h1>

        {/* Approval and Review Container */}
        <div className="card text-white mb-5">
          <h2 className="text-center">Approval and Review</h2>
          <div className="card-body">
            <div className="row">
              {approvalAndReviewData.map((item, idx) => (
                <div className="col-md-6 mb-4" key={idx}>
                  <div className="card text-dark bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon mr-3">{item.icon}</div>
                        <div>
                          <h3>{item.number}</h3>
                          <p>{item.title}</p>
                        </div>
                      </div>
                      <button className="btn blue btn-block mt-3">{item.buttonText}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics & Information Container */}
        <div className="card text-white mb-4">
          <h2 className="text-center">Statistics & Information</h2>
          <div className="card-body">
            <div className="row">
              {statisticsAndInfoData.map((item, idx) => (
                <div className={`col-md-6 mb-4 ${idx === 4 ? "col-md-12" : ""}`} key={idx}>
                  <div className="card text-dark bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon mr-3">{item.icon}</div>
                        <div>
                          <h3>{item.number}</h3>
                          <p>{item.title}</p>
                        </div>
                      </div>
                      <button className="btn blue btn-block mt-3">{item.buttonText}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
