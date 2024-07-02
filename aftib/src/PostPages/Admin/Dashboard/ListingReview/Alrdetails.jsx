import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchListingById,
  approveListing,
} from "../../../../utils/adminOpsRequests";
import { useLoading } from "../../../../Components/LoadingContext";

const Alrdetails = () => {
  const { id } = useParams();
  let token = window.localStorage.getItem("accessToken");
  let { setLoading, setLoadingText } = useLoading();
  const [listing, setListing] = useState(null);

  async function fetchListing() {
    try {
      setLoading(true);
      setLoadingText("Fetching Listing Information");
      console.log("Fetching listing with ID:", id);
      let response = await fetchListingById(id);
      console.log("Fetched listing:", response);
      setListing(response.listing); // Set the state to the actual listing object
    } catch (err) {
      console.error("Error fetching listing:", err.message);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  }

  async function approve() {
    try {
      setLoading(true);
      setLoadingText("Approving");
      console.log("Approving listing with ID:", id);
      let response = await approveListing(id, token);
      console.log("Approval response:", response);
    } catch (err) {
      console.error("Error approving listing:", err.message);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  }

  useEffect(() => {
    fetchListing();
  }, []);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="py-2 agent">
        <h1 className="text-center">Listing Details</h1>
      </div>

      <div className="row mt-4">
        <div className="section border">
          <h2 className="text-center">Main Information</h2>
          <div className="info-agent">
            <p>
              <strong>Title:</strong> {listing.title}
            </p>
            <p>
              <strong>Description:</strong> {listing.description}
            </p>
            <p>
              <strong>Property:</strong> {listing.saleType}
            </p>
            <p>
              <strong>Property Type:</strong> {listing.propertyType}
            </p>
            <p>
              <strong>Size:</strong> {listing.size} sqm
            </p>
            <p>
              <strong>Bedrooms:</strong> {listing.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {listing.bathrooms}
            </p>
            <p>
              <strong>Estate:</strong> {listing.estate}
            </p>
            <p>
              <strong>Year Built:</strong> {listing.yearBuilt}
            </p>
            <hr className="mr-4" />
            <p>
              <strong>Pricing Information:</strong> Monthly Rent:{" "}
              {listing.monthlyRentPayment}
            </p>
            <p>
              <strong>Full Address:</strong> {listing.location}
            </p>
            <p>
              <strong>State:</strong> {listing.state}
            </p>
            <p>
              <strong>LGA:</strong> {listing.LGA}
            </p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Contact Information</h2>
          <div className="info-agent">
            <p>
              <strong>Agent Name:</strong> {listing.agentContact?.name}
            </p>
            <p>
              <strong>Agent Phone:</strong> {listing.agentContact?.phone}
            </p>
            <p>
              <strong>Agent Email:</strong> {listing.agentContact?.email}
            </p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Property Images</h2>
          <div className="text-center d-flex alr-image-container">
            {listing.images?.map((image, index) => (
              <img
                src={image}
                key={index}
                className="alr-id"
                alt={`Property ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Owner's Information</h2>
          <div className="info-agent">
            <p>
              <strong>Owner Name:</strong> {listing.ownersContact?.name}
            </p>
            <p>
              <strong>Owner Phone:</strong> {listing.ownersContact?.phone}
            </p>
            <p>
              <strong>Owner Email:</strong> {listing.ownersContact?.email}
            </p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Approval Section</h2>
          <p className="text-center">
            If you are satisfied with the listing and have concluded your
            vetting, click the approval button.
          </p>
          <div className="text-center">
            <button onClick={approve} className="btn blue approval-btn">
              Approve This Listing
            </button>
          </div>
        </div>

        <div className="section  reject">
          <h2 className="text-center">Rejection Section</h2>
          <p className="text-center">
            If you are not satisfied with the listing, please provide a reason
            for rejection.
          </p>
          <div className="text-center">
            <textarea
              placeholder="Enter your rejection reason here"
              className="form-control"
            />
            <button className="btn danger mt-4">Reject This Listing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alrdetails;
