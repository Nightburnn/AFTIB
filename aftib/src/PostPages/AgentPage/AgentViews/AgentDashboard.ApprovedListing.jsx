import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import {ListingCard1} from "./Cards";

export function AgentApprovedListings() {
  function getApproved(bool,array){
    return bool? array.filter(x=> x.approved ): array.filter(x=> !x.approved)
  }
  let dashboardData = useSelector((state) => state.user.agentDashboardData)
  console.log({user: dashboardData})

  const handleViewListing = (id) => {
    console.log("View Listing clicked for:" ,id);
  };
  const handleEdit = (id) => {
    console.log("View Listing clicked for:", id);
  };
  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Approved Listings</h1>
        <h3 className="text-center">
          This is a list your Listings that have been approved by the admins.
        </h3>
      </div>
      <div className="row">
          {
           [].map(x=>{
              return (
                <div className="col-12 col-lg-4 col-md-6 p-2">
                  <ListingCard1
                    image={x.images[0]}
                    title={x.title}
                    address={x.location}
                    onViewListing={()=>{handleViewListing(x._id)}}
                    onEditListing={()=>{handleEdit(x._id)}}
                    buttonText={'View Listing'}
                  />
                </div>                  
              )
            })
          }
      </div>
    </div>
  );
}
