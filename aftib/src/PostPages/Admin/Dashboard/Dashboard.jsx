import React, { useState, useEffect } from "react";
import "./Dash.css";
import { TfiPrinter } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { getAdminDashboardData } from "../../../utils/adminOpsRequests";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  updateAdminDashboardData,
} from "../../../store/userSlice";

const Dashboard = () => {
  function getApproved(bool, array) {
    return bool
      ? array.filter((x) => x.approved)
      : array.filter((x) => !x.approved);
  }
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [agents, setAgents] = useState([]);
  let [hotels, setHotels] = useState([]);
  let [listings, setListings] = useState([]);
  let [transactions, setTransactions] = useState([]);
  let [users, setUsers] = useState([]);
  let [dashboardData, setDashboardData] = useState([]);
  async function getData() {
    try {
      let { agents, hotels, listings, transactions, users } =
      await Promise.resolve(getAdminDashboardData());
      setAgents(agents);
      setHotels(hotels);
      setListings(listings);
      setTransactions(transactions);
      setUsers(users);
      dispatch(
        updateAdminDashboardData({
          agents,
          hotels,
          listings,
          transactions,
          users,
        }),
      );
    } catch (err) {
      console.error({ error: err.message });
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="dash">
      <div className="container">
        <h1 className="my-4">Admin Dashboard</h1>

        {/* Approval and Review Container */}
        <div className="card text-white mb-5">
          <h2 className="text-center">Approval and Review</h2>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        {" "}
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApproved(false, agents).length}</h3>
                        <p>Pending Agents</p>
                      </div>
                    </div>
                    <Link
                      to={"/review-agent"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Pending Agents"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        {" "}
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApproved(false, listings).length}</h3>
                        <p>Pending Listings</p>
                      </div>
                    </div>
                    <Link
                      to={"/review-listings"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Pending Listings"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        {" "}
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApproved(false, hotels).length}</h3>
                        <p>Pending Hotels</p>
                      </div>
                    </div>
                    <Link
                      to={"/review-hotels"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Pending Hotels"}
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
                        {" "}
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApproved(true, agents).length}</h3>
                        <p>Approved Agents</p>
                      </div>
                    </div>
                    <Link
                      to={"/view-approved-agent"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Approved Agents"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        {" "}
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{users.length}</h3>
                        <p>Client Accounts</p>
                      </div>
                    </div>
                    <Link
                      to={"/view-client-account"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Client Accounts"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        {" "}
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApproved(true, listings).length}</h3>
                        <p>Approved Listings</p>
                      </div>
                    </div>
                    <Link
                      to={"/view-approved-listings"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Approved Listings"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        {" "}
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{getApproved(true, hotels).length}</h3>
                        <p>Approved Hotels</p>
                      </div>
                    </div>
                    <Link
                      to={"/view-approved-hotels"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Approved Hotels"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card text-dark bg-light h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon mr-3">
                        {" "}
                        <TfiPrinter />
                      </div>
                      <div>
                        <h3>{transactions.length}</h3>
                        <p>Transactions</p>
                      </div>
                    </div>
                    <Link
                      to={"/review-transactions"}
                      className="btn blue btn-block mt-3"
                    >
                      {"View Transactions"}
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

export default Dashboard;
