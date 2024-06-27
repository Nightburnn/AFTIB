import React, { useEffect, useState } from 'react';
import './listreview.css';
import sh1 from '../../assets/images/sh1.png';
import sh2 from '../../assets/images/sh2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListingReview = () => {
  const token = window.localStorage.getItem('accessToken');
  const navigate = useNavigate();;
  // BEFORE 2024/06/27
  // const [listing, setListing] = useState({
  //   title: 'Sample Listing',
  //   description: 'This is a sample listing description. This description is very long and should be truncated for better display.',
  //   images: [
  //     { src: sh1, desc: 'Image 1 Description' },
  //     { src: sh2, desc: 'Image 2 Description' },
  //     { src: 'image3.jpg', desc: 'Image 3 Description' },
  //     { src: 'image4.jpg', desc: 'Image 4 Description' },
  //   ],
  // });
  const [listing, setListing] = useState();
  const [isPending, setIsPending] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState();

  useEffect(
    () => {
      loadPendingListing();
    }, []
  )

  const loadPendingListing = async () => {
    const response = await axios.get('http://localhost:8080/listing/unApprovedListings/1');
    setListing(response.data);
  }

  const handleEdit = (obj) => {
    console.log('Editing listing...');
    navigate('/list?edit=' + obj._id);
  };

  const handleCreateNew = () => {
    console.log('Creating new listing...');
  };

  const handleDelete = async (obj) => {
    console.log('Deleting listing...');
    const btn = document.getElementById('deleteBtn' + obj._id);
    btn.setAttribute('disabled', true);
    await axios.delete('http://localhost:8080/listing/deleteListingById/' + obj._id, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    });
    await loadPendingListing();
    btn.setAttribute('disabled', false);
  };

  const handlePrevImage = (obj) => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : obj.images.length - 1));
  };

  const handleNextImage = (obj) => {
    setCurrentImageIndex((prevIndex) => (prevIndex < obj.images.length - 1 ? prevIndex + 1 : 0));
  };

  const handleView = (obj) => {
    setIsModalOpen(true);
    setDetails(obj);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDetails();
  };

  const truncateDescription = (desc, maxLength) => {
    return desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
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
          Listing Status: {isPending ? 'Pending' : 'Active'}
        </div>
        {
          listing?.listings?.map(
            (val, index) => {
              return <PendingCard currentImageIndex={currentImageIndex} obj={val} handleDelete={handleDelete} handleEdit={handleEdit} handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} handleView={handleView} truncateDescription={truncateDescription} key={index} />
            }
          )
        }
      </div>
      <button className="btn btn-success mt-2 mb-3" onClick={handleCreateNew}>
        Create New Listing
      </button>

      {isModalOpen && <Modal obj={details} currentImageIndex={currentImageIndex} handleCloseModal={handleCloseModal} handlePrevImage={handlePrevImage} handleNextImage={handleNextImage} />}


   
    </div>
  );
};

export default ListingReview;

const Modal = ({ obj, currentImageIndex, handleCloseModal, handlePrevImage, handleNextImage }) => {
  const img = obj.images[currentImageIndex] && obj.images[currentImageIndex].src ? obj.images[currentImageIndex].src : obj.images[currentImageIndex];
  const desc = obj.images[currentImageIndex] && obj.images[currentImageIndex].desc ? obj.images[currentImageIndex].desc : "No Image Description";
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Listing Details</h5>
            <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h5>{obj?.title}</h5>
            <p>{obj?.description}</p>
            <div className="image-carousel">
              <img src={img} alt="Listing Image" className="img-fluid" />
              <p className="mt-2 text-center">{desc}</p>
              <div className="carousel-controls text-center mt-2">
                <button className="btn btn-secondary btn-sm mr-2" onClick={() => handlePrevImage(obj)}>
                  &laquo;
                </button>
                <button className="btn btn-secondary btn-sm ml-2" onClick={() => handleNextImage(obj)}>
                  &raquo;
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const PendingCard = ({ currentImageIndex, key, obj, handlePrevImage, handleNextImage, handleEdit, handleDelete, handleView, truncateDescription }) => {
  const img = obj.images[currentImageIndex] && obj.images[currentImageIndex].src ? obj.images[currentImageIndex].src : obj.images[currentImageIndex];
  return (
    <div key={key} className="card-body d-flex align-items-center justify-content-between">
      <div className="d-flex flex-column align-items-center">
        <img src={img} alt="Listing Image" className="img-fluid carousel-image" />
        <div className="carousel-controls text-center mt-2">
          <button className="btn prev btn-sm mr-2" onClick={() => handlePrevImage(obj)}>
            &laquo;
          </button>
          <button className="btn prev btn-sm ml-2" onClick={() => handleNextImage(obj)}>
            &raquo;
          </button>
        </div>
      </div>
      <div className="ml-3 flex-grow-1 text-right move">
        <h5 className="card-title">{obj.title}</h5>
        <p className="card-text">{truncateDescription(obj.description, 100)}</p>
        <div className="button-group mt-2">
          <button className="btn warning btn-sm mr-2" onClick={() => handleEdit(obj)}>
            Edit
          </button>
          <button className="btn danger btn-sm mr-2" id={"deleteBtn" + obj._id} onClick={() => handleDelete(obj)}>
            Delete
          </button>
          <button className="btn info btn-sm" onClick={() => handleView(obj)}>
            View
          </button>
        </div>
      </div>
    </div>
  )
}