import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { ListingCard1 } from "./Cards";
import { getApproved } from "../../../utils/others";

export function AgentApprovedHotels() {
  let navigate = useNavigate();
  let dashboardData = useSelector((state) => state.user.agentDashboardData);
  let approved = getApproved(true, dashboardData.hotels);
  console.log({ approved });

  let listingDetails = {
    image:
      "https://res.cloudinary.com/mixambusiness/image/upload/v1718797096/listings/qhzp4cvoqvb7zy9l1kqv.jpg",
    title: "Beautiful Villa",
    date: "2023-06-29",
    address: "123 Main St, Springfield",
    message: "Approved",
    buttonText: "View Hotel",
  };

  const handleViewListing = (id) => {
    console.log("View Listing clicked for:", id);
    navigate(`/viewhotel/${id}`);
  };
  const handleEdit = (id) => {
    console.log("View Listing clicked for:", id);
    navigate(`/hotellist?edit=true&id=${id}`);
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
        {approved.map((x) => {
          return (
            <div key={x._id} className="col-12 col-md-6 col-xl-4 p-2">
              <ListingCard1
                image={x.images[0]}
                title={x.name}
                address={x.address}
                onViewListing={() => {
                  handleViewListing(x._id);
                }}
                onEditListing={() => {
                  handleEdit(x._id);
                }}
                viewText={"View Hotel"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
