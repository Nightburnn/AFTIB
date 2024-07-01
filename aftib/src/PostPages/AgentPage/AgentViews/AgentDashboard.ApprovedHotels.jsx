import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import ListingCard from "./Cards";

export function AgentApprovedHotels() {
  function getApproved(bool,array){
    return bool? array.filter(x=> x.approved ): array.filter(x=> !x.approved)
  }
  let dashboardData = useSelector((state) => state.user.agentDashboardData)
  let approved = getApproved(true,dashboardData.hotels)
  console.log({approved})
  let listingDetails = {
    image:
      "https://res.cloudinary.com/mixambusiness/image/upload/v1718797096/listings/qhzp4cvoqvb7zy9l1kqv.jpg",
    title: "Beautiful Villa",
    date: "2023-06-29",
    address: "123 Main St, Springfield",
    message: "Approved",
    buttonText: "View Hotel",
  };
  const handleViewListing = () => {
    console.log("View Listing clicked for:", listingDetails.title);
  };

  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Approved Hotels</h1>
        <h3 className="text-center">
          This is a list your Hotels that have been approved by the admins.
        </h3>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4 col-md-6 p-2">
          <ListingCard
            image={listingDetails.image}
            title={listingDetails.title}
            date={listingDetails.date}
            address={listingDetails.address}
            message={listingDetails.message}
            onViewListing={handleViewListing}
            buttonText={listingDetails.buttonText}
          />
        </div>
        <div className="col-12 col-lg-4 col-md-6 p-2">
          <ListingCard
            image={listingDetails.image}
            title={listingDetails.title}
            date={listingDetails.date}
            address={listingDetails.address}
            message={listingDetails.message}
            onViewListing={handleViewListing}
            buttonText={listingDetails.buttonText}
          />
        </div>
        <div className="col-12 col-lg-4 col-md-6 p-2">
          <ListingCard
            image={listingDetails.image}
            title={listingDetails.title}
            date={listingDetails.date}
            address={listingDetails.address}
            message={listingDetails.message}
            onViewListing={handleViewListing}
            buttonText={listingDetails.buttonText}
          />
        </div>
      </div>
    </div>
  );
}
