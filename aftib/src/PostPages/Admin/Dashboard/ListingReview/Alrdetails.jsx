import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchListingById } from '../../../../utils/adminOpsRequests';
import { useLoading } from '../../../../Components/LoadingContext';
const Alrdetails = () => {
  const { id } = useParams();
  let token = window.localStorage.getItem("accessToken");
  let { setLoading, setLoadingText } = useLoading();
  const [listing,setListing] = useState({})
  async function fetchListings(){
    try {
      setLoading(true)
      setLoadingText('Fetching Listing Information')
      let response = await fetchListingById(id)
      console.log(response)
      setListing(response)
    }
    catch (err){
      console.error(err.message)
    }
    finally {
      setLoading(false)
      setLoadingText('')
    }
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
                <p><strong>Title:</strong> Aluxury duplex in lekki </p>
          <p><strong>Description:</strong>This luxury duplex in lekki sits on a 75 square kilometer</p>
          <p><strong>Property:</strong> For Sale </p>
          <p><strong>Property Type:</strong> Apartment </p>
          <p><strong>Size:</strong> 70sqm </p>
          <p><strong>Bedroom:</strong> 3 </p>
          <p><strong>Bathrooms:</strong> 2 </p>
          <p><strong>Is this property in an estate? If yes, what is the name of the estate:</strong> Nill || peace estate </p>
          <p><strong>What year was this property built:</strong> Nill || 2021 </p>
<hr className='mr-4'/>
<p><strong>Pricing Information:</strong> Full Price || min || max </p>
          <p><strong>Full Address:</strong>23A, IkoYI STREET,</p>
          <p><strong>State:</strong> Abia </p>
          <p><strong>LGA:</strong> Aba </p>
           </div>
        </div>

        <div className="section border">
           <h2 className="text-center">Contact Information</h2>
              <div className="info-agent">
                <p><strong>Agent Name:</strong> Angelica Baker </p>
                <p><strong>Agent Phone:</strong> 012345678901 </p>
                <p><strong>Agent Email:</strong> Example@gmail.com </p>
              </div>
        </div>

        <div className="section border">
              <h2 className="text-center">Property Images</h2>
              <div className="text-center d-flex alr-image-container">
  <img src="https://via.placeholder.com/150" className="alr-id" alt="Government ID" />
  <img src="https://via.placeholder.com/150" className="alr-id" alt="Government ID" />
  <img src="https://via.placeholder.com/150" className="alr-id" alt="Government ID" />
  <img src="https://via.placeholder.com/150" className="alr-id" alt="Government ID" />
</div>

        </div>

        <div className="section border">
            <h2 className="text-center">Agent Information</h2>
            <div className="info-agent">
                <p className="text-center">This Apartment was listed by NameofAgent</p>
                <div className="button-container">
      <button className='btn blue'>View Agent Info</button>
    </div>
                    <h4 className="text-center mt-1">Notify this agent</h4>
                <p className="text-center">Send an email to the user notifying them of any shortcomings or observations that might need to be changed or added in their request to be approved</p>
            </div>
        </div>

        <div className="section border">
        <h2 className="text-center">Approval Section</h2>
        <p className="text-center">
          If you are satisfied with the agent and have concluded your vetting, click the approval button. Note that by approving this user request, you grant this user the ability to use the agents feature of this website and post their listing.
        </p>
        <div className="text-center">
          <button className="btn blue approval-btn">Approve This Request</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Alrdetails