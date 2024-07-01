import React, { useState, useEffect } from "react";
import { useLoading } from "../../../Components/LoadingContext";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";

export function ClientReservationList() {
  let { setLoading, setLoadingText } = useLoading();
  let userData = useSelector((state) => state.userData);
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
        <div
          key={hotel._id}
          className="col-12 col-lg-4 col-md-6 m-4 p-2 border-gray"
        >
          <div className="">
            <div className="row">
              <img
                style={{ width: "150px", borderRadius: "10px" }}
                src={
                  "https://res.cloudinary.com/mixambusiness/image/upload/v1718797096/listings/qhzp4cvoqvb7zy9l1kqv.jpg"
                }
                alt="Listing"
              />
              <div className="col">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="">
                  <strong>Starting:</strong> {hotel.startDate}
                </p>
                <p className="">
                  <strong>Total Nights:</strong> {hotel.totalNights}
                </p>
                <div className="px-3 pb-3">
                  <Link
                    to={`/alrdetails/${hotel._id}`}
                    className="btn blue btn-block"
                  >
                    View Reservation Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
