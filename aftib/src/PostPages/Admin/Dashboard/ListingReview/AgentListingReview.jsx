import React, { useEffect,useState } from 'react';
import './AgentListingReview.css';
import { Link } from 'react-router-dom';

import { fetchUnapprovedListings } from "../../../../utils/adminOpsRequests";
import { useLoading } from "../../../../Components/LoadingContext";


const AgentListingReview = () => {
  let token = window.localStorage.getItem("accessToken");
  let { setLoading, setLoadingText } = useLoading();
  let [unapprovedListings,setUnapprovedListings] = useState([])
  async function fetchListings(){
    try {
      setLoading(true)
      setLoadingText('Fetching Agent Information')
      let response = await fetchUnapprovedListings()
      console.log(response.listingsData)
      setUnapprovedListings(response.listingsData)
    }
    catch (err){
      console.error(err.message)
    }
    finally {
      setLoading(false)
      setLoadingText('')
    }
  }
  useEffect(()=>{
    fetchListings()
  },[])

  return (
    <div className="container mt-3 alr">
      <div className="py-4 agent">
        <h1 className="text-center">Pending New Listings</h1>
        <h3 className="text-center">Review the pending listings below for approval.</h3>
      </div>
      <div className="row mt-4">
        {unapprovedListings.map(listing => (
          <div key={listing.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <img 
                  src="https://via.placeholder.com/50"
                  className="rounded-circle" 
                  alt="Listing"
                />
                <div> 
                  <h5 className="card-title">{listing.title}</h5>
                  <p className="card-text"><strong>Location:</strong> {listing.location}</p>
                  <p className="card-text"><strong>Listed As:</strong> {listing.saleType}</p>
                </div>
              </div>
              <div className="px-3 pb-3">
                <Link to={`/alrdetails/${listing._id}`} className="btn blue btn-block">Review The Listing</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default AgentListingReview;
