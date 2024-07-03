import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { ListingCard2 } from "./Cards";
import { getApproved } from "../../../utils/others";

export function AgentPendingHotels() {
  let navigate = useNavigate();
  let dashboardData = useSelector((state) => state.user.agentDashboardData);
  let pending = getApproved(false, dashboardData.hotels);
  console.log({ pending });

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
        <h1 className="text-center">My Pending Hotels</h1>
        <h3 className="text-center">
          This is a list of your of your hotels that have not been approved
        </h3>
      </div>
      <div className="row">
        {pending.map((x) => {
          return (
            <div key={x._id} className="col-12 col-md-6 col-xl-4 p-2">
              <ListingCard2
                image={x.images[0]}
                title={x.name}
                address={x.address}
                onViewListing={() => {
                  handleViewListing(x._id);
                }}
                onEditListing={() => {
                  handleEdit(x._id);
                }}
                viewText={"View Listing"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
