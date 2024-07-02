import React, { useState, useEffect } from "react";
import "../../Admin/Dashboard/Dash.css";
import { TfiPrinter } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import {
  getAgencyRequestByToken,
  getAgentDashboardData,
  getUserData,
} from "../../../utils/adminOpsRequests";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  updateAgentDashboardData,
} from "../../../store/userSlice";

const AgentDashboard = () => {
  let navigate = useNavigate();
  let [agentData, setAgentData] = useState({});
  let [transactions, setTransactions] = useState([]);
  let [sales, setSales] = useState([]);
  let [hotelbookings, setHotelBookings] = useState([]);
  let [rentals, setRentals] = useState([]);
  let [userData, setUserData] = useState(null);
  let [dashboardData, setDashboardData] = useState({});
  let [hotels, setHotel] = useState([]);
  let [listings, setListings] = useState([]);
  let [message, setMessage] = useState("");
  let dispatch = useDispatch();
  async function getData() {
    try {
      let data = await Promise.resolve(getUserData());
      dispatch(updateUserData(data));
      setHotelBookings(data.myHotelReservations);
      setTransactions(data.myTransactions);
      setSales(data.myPurchases);
      setRentals(data.myRentals);
      console.log({ data });
    } catch (err) {
      console.error({ error: err.message });
    }
  }
  const goToAgentRegistration = () => {
    navigate("/agent-registration?edit=true");
  };
  function getApprovedCount(bool, array) {
    return bool
      ? array.filter((x) => x.approved).length
      : array.filter((x) => !x.approved).length;
  }
  async function getByDashboardData() {
    try {
      let response = await getAgentDashboardData();
      // fill the other data
      setDashboardData(response);
      console.log({ dashboardDataFromAgentDashboard: response });
      dispatch(updateAgentDashboardData(response));
      setHotel(response.hotels);
      setListings(response.listings);
    } catch (err) {
      console.error(err.message);
    }
  }
  async function getByToken() {
    try {
      let response = await getAgencyRequestByToken();
      // fill the other data
      setAgentData(response);
      if (response.approvalState == "rejected") {
        setMessage(response.rejectionMessage);
      } else if (response.approvalState == "pending") {
        setMessage("Your request is currently being reviewed by the admins");
      } else {
        setMessage("You have been approved as an Agent.");
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    // fetches user account data
    getData();
    // fetches agency data
    getByToken();
    // gets agent dashboard data.
    getByDashboardData();
  }, []);

  return (
    <div className="dash">
      <div className="container">
        <h1 className="my-4">Agent Dashboard</h1>

        <div className="card text-white mb-5">
          <h2 className="text-center">OverView</h2>
          <div className="white-container">
            <h3 className="text-center">
              <p>
                Approval Status :{" "}
                {String(agentData.approvalState).toUpperCase() || ""}
              </p>
              <p className="mt-2 agentred">Message: {message}</p>
              <button className="btn blue" onClick={goToAgentRegistration}>
                Edit Registration Details
              </button>
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApprovedCount(true, listings)}</h3>
                        <p>My Approved Listing</p>
                      </div>
                    </div>
                    <Link
                      to={"/agent/approvedlist"}
                      className="btn blue btn-block mt-3"
                    >
                      View Your Approved Listings
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApprovedCount(true, hotels)}</h3>
                        <p>My Approved Hotels</p>
                      </div>
                    </div>
                    <Link
                      to={"/agent/approvedhotels"}
                      className="btn blue btn-block mt-3"
                    >
                      View Approved Hotels
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApprovedCount(false, listings)}</h3>
                        <p>Pending Listing</p>
                      </div>
                    </div>
                    <Link
                      to={"/agent/pendinglist"}
                      className="btn blue btn-block mt-3"
                    >
                      View Pending Listings
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApprovedCount(false, hotels)}</h3>
                        <p>Pending Hotels</p>
                      </div>
                    </div>
                    <Link
                      to={"/agent/pendinghotels"}
                      className="btn blue btn-block mt-3"
                    >
                      View Pending Hotels
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics & Information Container */}
        <div className="card text-white mb-4">
          <h2 className="text-center">Statistics & Information</h2>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{transactions.length}</h3>
                        <p>My Transactions</p>
                      </div>
                    </div>
                    <Link
                      to={"/agent/transactions"}
                      className="btn blue btn-block mt-3"
                    >
                      View Transactions
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{sales.length}</h3>
                        <p>My Property Sales</p>
                      </div>
                    </div>
                    <Link
                      to={"/agent/propertysales"}
                      className="btn blue btn-block mt-3"
                    >
                      View Sales Record
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{hotelbookings.length}</h3>
                        <p>Hotel Bookings</p>
                      </div>
                    </div>
                    <Link
                      to={"/agent/hotelbookings"}
                      className="btn blue btn-block mt-3"
                    >
                      View Bookings
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{rentals.length}</h3>
                        <p>Property Rentals</p>
                      </div>
                    </div>
                    <Link
                      to={"/agent/propertyrentals"}
                      className="btn blue btn-block mt-3"
                    >
                      View Rental Records
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

export default AgentDashboard;
