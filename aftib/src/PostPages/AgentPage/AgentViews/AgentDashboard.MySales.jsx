import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import ListingCard from "./Cards";

export function AgentPropertySales() {
  let userData = useSelector((state) => state.user.userData);
  let listingDetails = {
    image:
      "https://res.cloudinary.com/mixambusiness/image/upload/v1718797096/listings/qhzp4cvoqvb7zy9l1kqv.jpg",
    title: "Beautiful Villa in Lekki Phase 2",
    date: "2023-06-29",
    address: "123 Main St, Springfield",
    message: "You sold this property",
    buttonText: "View Property",
  };
  const handleViewListing = () => {
    console.log("View Listing clicked for:", listingDetails.title);
  };
  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Property Sales</h1>
        <h3 className="text-center">
          This is a list of properties that you have sold.
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
