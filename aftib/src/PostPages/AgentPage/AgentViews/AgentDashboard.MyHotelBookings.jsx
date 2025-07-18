import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import ListingCard from "./Cards";

export function AgentHotelBookings() {
  let userData = useSelector((state) => state.user.userData);
  let hotelBooking = userData.myHotelBookings
  console.log({hotelBooking})
  let listingDetails = {
    image:
      "https://res.cloudinary.com/mixambusiness/image/upload/v1718797096/listings/qhzp4cvoqvb7zy9l1kqv.jpg",
    title: "Eko hotel and Suites",
    date: "2023-06-29",
    address: "123 Main St, Springfield",
    message: "Your hotel got this booking",
    buttonText: "View Booking Details",
  };
  const handleViewListing = () => {
    console.log("View Listing clicked for:", listingDetails.title);
  }
  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Hotel Bookings</h1>
        <h3 className="text-center">
          This is a record of all Hotel Bookings you have recieved
        </h3>
      </div>
      <div className="row">
      {
          hotelBooking.map(x=>{
            return (
              <div className="col-12 col-md-6 col-lg-4 border-gray p-2">
                  <div className="col">
                    <h5 className="card-title py-3">{x.details.narration}</h5>
                    <p className="card-text">
                      <strong>Transaction Date:</strong> {new Date(x.details.date).toLocaleString()}
                    </p>
                    <p className="card-text">
                      <strong>Remita Retrieval Reference (RRR):</strong> {x.details.RRR}
                    </p>
                    <p className="card-text">
                      <strong><i>View More Information with the button below</i></strong> 
                    </p>
                    <div className="px-3 py-1 viewPropertyContainer">
                      <Link
                        to={`/viewhotel/${x.details.hotelId}`}
                        className="btn blue btn-block"
                      >
                        View Hotel
                      </Link>
                    </div>
                  </div>
                </div>
            )
          })
        }
      </div>
    </div>
  );
}
