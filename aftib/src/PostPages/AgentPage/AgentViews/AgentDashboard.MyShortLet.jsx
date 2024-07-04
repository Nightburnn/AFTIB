import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import ListingCard from "./Cards";

export function AgentPropertyShortlet() {
  let userData = useSelector((state) => state.user.userData)
  let shortLets = userData.myShortLets

  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Short Lets</h1>
        <h3 className="text-center">
          This is a list of properties that you have sold.
        </h3>
      </div>
      <div className="row">
        {
          shortLets.map(x=>{
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
                        to={`/property-details/${x.details.propertyId}`}
                        className="btn blue btn-block"
                      >
                        View ShortLet
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
