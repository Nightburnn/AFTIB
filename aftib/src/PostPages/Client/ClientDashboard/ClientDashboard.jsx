import React, { useEffect, useState } from "react";
import "../../Admin/Dashboard/Dash.css";
import { TfiPrinter } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../../store/userSlice";
import { getUserData } from "../../../utils/adminOpsRequests";

const ClientDashboard = () => {
  let [userData, setUserData] = useState(null);
  let [transactions, setTransactions] = useState([]);
  let [myPurchases, setMyPurchases] = useState([]);
  let [myRentals, setMyRentals] = useState([]);
  let [myShortLets,setMyShortlets] = useState([])
  let [myHotelReservations, setMyHotelReservations] = useState([]);
  let dispatch = useDispatch();
  async function getData() {
    try {
      let data = await Promise.resolve(getUserData());
      dispatch(updateUserData(data));
      setMyHotelReservations(data.myHotelReservations);
      setTransactions(data.myTransactions);
      setMyPurchases(data.myPurchases);
      setMyRentals(data.myRentals);
      setMyShortlets(data.myShortLets)
    } catch (err) {
      console.error({ error: err.message });
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="dash">
      <div className="container">
        <h1 className="my-4">Client Dashboard</h1>
        <div className="card text-white mb-5">
          <h2 className="text-center">Overview</h2>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">{<TfiPrinter />}</div>
                      <div>
                        <h3>{myPurchases.length}</h3>
                        <p>My Purchases</p>
                      </div>
                    </div>
                    <Link
                      to={"/client/purchaselist"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Your Purchases"}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">{<TfiPrinter />}</div>
                      <div>
                        <h3>{myRentals.length}</h3>
                        <p>My Rentals</p>
                      </div>
                    </div>
                    <Link
                      to={"/client/rentallist"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Your Rentals"}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">{<TfiPrinter />}</div>
                      <div>
                        <h3>{myHotelReservations.length}</h3>
                        <p>My Hotel Reservation</p>
                      </div>
                    </div>
                    <Link
                      to={"/client/hotelreservations"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Your Reservations"}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">{<TfiPrinter />}</div>
                      <div>
                        <h3>{myShortLets.length}</h3>
                        <p>My Shortlets</p>
                      </div>
                    </div>
                    <Link
                      to={"/client/shortletlist"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Your Shortlets"}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">{<TfiPrinter />}</div>
                      <div>
                        <h3>{transactions.length}</h3>
                        <p>My Transactions</p>
                      </div>
                    </div>
                    <Link
                      to={"/client/transactionslist"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Your Transactions"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
