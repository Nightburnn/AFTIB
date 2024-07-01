import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchApprovedHotels } from "../../../../utils/adminOpsRequests";
import { useLoading } from "../../../../Components/LoadingContext";

const Vha = () => {
  let token = window.localStorage.getItem("accessToken");
  let { setLoading, setLoadingText } = useLoading();
  const [approvedHotels, setApprovedHotels] = useState([]);

  async function fetchData() {
    try {
      setLoading(true);
      setLoadingText("Fetching Approved Hotels");
      const page = 1; // Replace with the actual page number if needed
      const retrieved = await fetchApprovedHotels(page);
      console.log("Retrieved hotels:", retrieved);
      setApprovedHotels(retrieved.hotels);
    } catch (error) {
      console.error("Error fetching approved hotels:", error.message);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container hlr mt-3">
      <div className="py-4 agent">
        <h1 className="text-center">Approved Hotels</h1>
        <h3 className="text-center">Below are the approved hotel listings.</h3>
      </div>
      <div className="row mt-4">
        {approvedHotels.map((hotel) => (
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
                  to={`/Vhadetails/${hotel._id}`}
                  className="btn blue btn-block"
                >
                  View Hotel
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vha;
