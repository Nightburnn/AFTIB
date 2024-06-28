import React from 'react'
import '../../Admin/Dashboard/Dash.css'
import { TfiPrinter } from "react-icons/tfi";
import { Link } from 'react-router-dom';

const approvalAndReviewData = [
  { icon: <TfiPrinter />, number: "2,345", title: "My Transactions", buttonText: "Review Request", link: "/review-agent" },
  { icon: <TfiPrinter />, number: "2,345", title: "My purchases", buttonText: "Review Hotel", link: "/review-listings" },
  { icon: <TfiPrinter />, number: "2,345", title: "My Rentals", buttonText: "Review Request", link: "/review-hotels" },
  { icon: <TfiPrinter />, number: "2,345", title: "My Hotel Reservations", buttonText: "Review Hotel", link: "/review-transactions" },
];



const ClientDashboard = () => {
  return (
    <div className="dash">
      <div className="container">
        <h1 className="my-4">Client Dashboard</h1>

       
        <div className="card text-white mb-5">
          <h2 className="text-center">OverView</h2>
        
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
                      <Link to={item.link} className="btn blue btn-block mt-3">{item.buttonText}</Link>
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

export default ClientDashboard;
