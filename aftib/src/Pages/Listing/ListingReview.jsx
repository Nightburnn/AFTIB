import React, { useState } from "react";
import "./listreview.css";
import sh1 from "../../assets/images/sh1.png";
import sh2 from "../../assets/images/sh2.png";
import { fetchUnapprovedListings } from "../../utils/adminOpsRequests";
import { useLoading } from "../../Components/LoadingContext";
const ListingReview = () => {
  let token = window.localStorage.getItem("accessToken");
  let { setLoading, setLoadingText } = useLoading();
  let [unapprovedListings, setUnapprovedListings] = useState([]);
  const [listing, setListing] = useState({
    title: "Sample Listing",
    description:
      "This is a sample listing description. This description is very long and should be truncated for better display.",
    images: [
      { src: sh1, desc: "Image 1 Description" },
      { src: sh2, desc: "Image 2 Description" },
      { src: "image3.jpg", desc: "Image 3 Description" },
      { src: "image4.jpg", desc: "Image 4 Description" },
    ],
  });
  const [isPending, setIsPending] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function fetchListings() {
    try {
      setLoading(true);
      setLoadingText("Fetching Agent Information");
      let response = fetchUnapprovedListings();
      console.log(response);
      setUnapprovedListings(response);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  }
  const handleEdit = () => {
    console.log("Editing listing...");
  };

  const handleCreateNew = () => {
    console.log("Creating new listing...");
  };

  const handleDelete = () => {
    console.log("Deleting listing...");
    setListing(null);
    setIsPending(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : listing.images.length - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < listing.images.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const handleView = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const truncateDescription = (desc, maxLength) => {
    return desc.length > maxLength
      ? `${desc.substring(0, maxLength)}...`
      : desc;
  };

  if (!listing) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          No listing available. Please create a new listing.
        </div>
        <button className="btn btn-primary" onClick={handleCreateNew}>
          Create New Listing
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-3 lreview">
      <h2 className="text-center mb-4">Listing Review</h2>
      <div className="card">
        <div className="card-header blue text-white">
          Listing Status: {isPending ? "Pending" : "Active"}
        </div>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column align-items-center">
            <img
              src={listing.images[currentImageIndex].src}
              alt="Listing Image"
              className="img-fluid carousel-image"
            />
            <div className="carousel-controls text-center mt-2">
              <button
                className="btn prev btn-sm mr-2"
                onClick={handlePrevImage}
              >
                &laquo;
              </button>
              <button
                className="btn prev btn-sm ml-2"
                onClick={handleNextImage}
              >
                &raquo;
              </button>
            </div>
          </div>
          <div className="ml-3 flex-grow-1 text-right move">
            <h5 className="card-title">{listing.title}</h5>
            <p className="card-text">
              {truncateDescription(listing.description, 100)}
            </p>
            <div className="button-group mt-2">
              <button className="btn warning btn-sm mr-2" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn danger btn-sm mr-2" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn info btn-sm" onClick={handleView}>
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-success mt-2 mb-3" onClick={handleCreateNew}>
        Create New Listing
      </button>

      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Listing Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5>{listing.title}</h5>
                <p>{listing.description}</p>
                <div className="image-carousel">
                  <img
                    src={listing.images[currentImageIndex].src}
                    alt="Listing Image"
                    className="img-fluid"
                  />
                  <p className="mt-2 text-center">
                    {listing.images[currentImageIndex].desc}
                  </p>
                  <div className="carousel-controls text-center mt-2">
                    <button
                      className="btn btn-secondary btn-sm mr-2"
                      onClick={handlePrevImage}
                    >
                      &laquo;
                    </button>
                    <button
                      className="btn btn-secondary btn-sm ml-2"
                      onClick={handleNextImage}
                    >
                      &raquo;
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingReview;
