import React, { useEffect, useState } from "react";
import {
  approveHotel,
  fetchHotelById,
} from "../../../../utils/adminOpsRequests";
import { useLoading } from "../../../../Components/LoadingContext";
import { useParams } from "react-router-dom";

const Hlrdetails = () => {
  let token = window.localStorage.getItem("accessToken");
  let { id } = useParams();
  let { setLoading, setLoadingText } = useLoading();
  const [hotel, setHotel] = useState(null);

  async function getById() {
    try {
      setLoading(true);
      setLoadingText("Getting hotel Information");
      const fetchedHotel = await fetchHotelById(id);
      console.log({ response: fetchedHotel });
      setHotel(fetchedHotel);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getById();
  }, []);

  async function sendApproveRequest() {
    try {
      setLoading(true);
      setLoadingText("Approving");
      const fetchedHotel = await approveHotel(id, token);
      setHotel(fetchedHotel);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!hotel) {
    return <div>Loading...</div>;
  }

  const { name, address, contact, locationData, createdBy } = hotel;

  return (
    <div className="container mt-3">
      <div className="py-2 agent">
        <h1 className="text-center">Hotel Details</h1>
      </div>

      <div className="row mt-4">
        <div className="section border">
          <h2 className="text-center">Main Information</h2>
          <div className="info-agent">
            <p>
              <strong>Name:</strong> {name || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {address || "N/A"}
            </p>
            <p>
              <strong>State:</strong> {locationData?.state || "N/A"}
            </p>
            <p>
              <strong>LGA:</strong> {locationData?.LGA || "N/A"}
            </p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Contact Information</h2>
          <div className="info-agent">
            <p>
              <strong>Phone Number:</strong> {contact?.phone || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {contact?.email || "N/A"}
            </p>
            <p>
              <strong>Website:</strong> {contact?.website || "N/A"}
            </p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Agent Information</h2>
          <div className="info-agent">
            <p className="text-center">
              This Hotel was listed by {createdBy || "N/A"}
            </p>
            <div className="button-container">
              <button className="btn blue">View Agent Info</button>
            </div>
            <h4 className="text-center mt-1">Notify this agent</h4>
            <p className="text-center">
              Send an email to the user notifying them of any shortcomings or
              observations that might need to be changed or added in their
              request to be approved
            </p>
          </div>
        </div>

        <div className="section border">
          <h2 className="text-center">Approval Section</h2>
          <p className="text-center">
            If you are satisfied with the agent and have concluded your vetting,
            click the approval button. Note that by approving this user request,
            you grant this user the ability to use the agents feature of this
            website and post their listing.
          </p>
          <div className="text-center">
            <button
              onClick={sendApproveRequest}
              className="btn blue approval-btn"
            >
              Approve This Request
            </button>
          </div>
        </div>

        <div className="section  reject">
          <h2 className="text-center">Rejection Section</h2>
          <p className="text-center">
            If you are not satisfied with the hotel listing, please provide a
            reason for rejection.
          </p>
          <div className="text-center">
            <textarea
              placeholder="Enter your rejection reason here"
              className="form-control"
            />
            <button className="btn danger mt-4">
              Reject This Hotel Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hlrdetails;
