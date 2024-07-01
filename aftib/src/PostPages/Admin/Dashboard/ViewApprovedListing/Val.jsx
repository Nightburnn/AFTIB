import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoading } from "../../../../Components/LoadingContext";

const Val = () => {
  let { setLoading, setLoadingText } = useLoading();
  let [listings, setListings] = useState([]);

  async function fetchListings() {
    try {
      setLoading(true);
      setLoadingText("Fetching Agent Listings");
      const response = await fetch(
        "https://aftib-6o3h.onrender.com/getListings/:sectionNo",
      );
      const data = await response.json();
      console.log("Fetched Listings:", data.listingsData);
      setListings(data.listingsData);
    } catch (err) {
      console.error("Error fetching listings:", err.message);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  const handleApprove = async (id) => {
    let token = window.localStorage.getItem("accessToken");
    try {
      setLoading(true);
      setLoadingText("Approving Listing");
      console.log("Approving Listing ID:", id);
      // Implement the approve listing functionality here
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      console.error("Error approving listing:", err.message);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  return (
    <div className="container mt-3 alr">
      <div className="py-4 agent">
        <h1 className="text-center">Listings</h1>
        <h3 className="text-center">Review the listings below.</h3>
      </div>
      <div className="row mt-4">
        {listings.map((listing) => (
          <div key={listing._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="https://via.placeholder.com/150"
                  className="rounded-circle"
                  alt="Listing"
                />
                <div>
                  <h5 className="card-title">{listing.title}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {listing.location}
                  </p>
                  <p className="card-text">
                    <strong>Listed As:</strong> {listing.saleType}
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3">
                <Link
                  to={`/valdetails/${listing._id}`}
                  className="btn blue btn-block"
                >
                  View Listing
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Val;
