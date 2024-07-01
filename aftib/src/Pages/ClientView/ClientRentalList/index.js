import React, {useState, useEffect} from "react";
import { useLoading } from "../../../Components/LoadingContext";
import { useSelector, useDispatch } from 'react-redux'
import './style.css'
import { Link } from "react-router-dom";

export function ClientRentalList(){
    let {setLoading,setLoadingText} = useLoading()
    let userData = useSelector((state)=> state.userData)
    let listing = {_id: '902',location: 'Lekki Phase 1',saleType: 'You bought this property', title: 'A Luxurious 2 bedroom flat in lekki phase 2'}
    console.log({userData})
    return (
        <div className="p-3 p-md-5" >
            <div style={{borderRadius: '10px'}} className="py-4 agent my-3">
                <h1 className="text-center">Properties You Have Rented</h1>
                <h3 className="text-center">This are the list of properties you have rented.</h3>
            </div>            
            <div className="row">
              <div key={listing.id} className="col-12 col-lg-4 col-md-6 m-4 p-2 border-gray">
              <div className="">
                <div className="row">
                  <img  style={{width: '150px',borderRadius: '10px'}}
                    src={"https://res.cloudinary.com/mixambusiness/image/upload/v1718797096/listings/qhzp4cvoqvb7zy9l1kqv.jpg"} 
                    alt="Listing"
                  />
                  <div className="col"> 
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="card-text"><strong>Location:</strong> {listing.location}</p>
                  <div className="px-3 pb-3">
                    <Link to={`/alrdetails/${listing._id}`} className="btn blue btn-block">View Your Rental</Link>
                  </div>
                  </div>
                </div>

              </div>
              </div>
            </div>
        </div>
    )
}