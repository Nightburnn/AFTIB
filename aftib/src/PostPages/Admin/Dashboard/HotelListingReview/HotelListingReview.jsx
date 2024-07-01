import React, { useEffect, useState } from "react";
import "./HotelListingReview.css";
import { Link } from "react-router-dom";
import { fetchUnapprovedHotels } from "../../../../utils/adminOpsRequests";
import { useLoading } from "../../../../Components/LoadingContext";

const HotelListingReview = () => {
  let token = window.localStorage.getItem("accessToken");
  let { setLoading, setLoadingText } = useLoading();
  const [unapprovedHotels, setUnapprovedHotels] = useState([]);

  async function fetchData() {
    try {
      setLoading(true);
      setLoadingText("Fetching Pending Hotels");
      const page = 1; // Replace with the actual page number if needed
      const retrieved = await fetchUnapprovedHotels(page);
      console.log("Retrieved hotels:", retrieved);
      setUnapprovedHotels(retrieved.hotels);
    } catch (error) {
      console.error("Error fetching unapproved hotels:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container hlr mt-3">
      <div className="py-4 agent">
        <h1 className="text-center">Review New Hotels</h1>
        <h3 className="text-center">
          Below are the new listings that need to be reviewed.
        </h3>
      </div>
      <div className="row mt-4">
        {unapprovedHotels.map((hotel) => (
          <div key={hotel._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="card-text">
                  <strong>Agent:</strong> {hotel.createdBy}
                </p>
              </div>
              <div className="px-3 pb-3">
                <Link
                  to={`/hlrdetails/${hotel._id}`}
                  className="btn blue btn-block"
                >
                  Review The Hotel
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelListingReview;
