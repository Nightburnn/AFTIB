import React, { useState, useEffect } from "react";
import { useLoading } from "../../../Components/LoadingContext";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";

export function ClientReservationList() {
  let { setLoading, setLoadingText } = useLoading();
  let userData = useSelector((state) => state.user.userData);
  let hotelReservations = userData.myHotelReservations
  let hotel = {
    name: "Eko hotel luxury Suites",
    startDate: "23-July-2024",
    totalNights: "14 Nights",
    _id: "932kf",
  };
  console.log({ userData });
  return (
    <div className="p-3 p-md-5">
      <div style={{ borderRadius: "10px" }} className="py-4 agent my-3">
        <h1 className="text-center">My Hotel Reservations</h1>
        <h3 className="text-center">
          These are the list of Hotel reservations you have made
        </h3>
      </div>
      <div className="row">
      {
          hotelReservations.map(x=>{
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
