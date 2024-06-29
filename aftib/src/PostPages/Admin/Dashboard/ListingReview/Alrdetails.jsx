import React from 'react'

const Alrdetails = () => {
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
                  <div className="text-center d-flex alr-image">
                  <img src="https://via.placeholder.com/150" className="alr-id" alt="Government ID" />
 
                 <img src="https://via.placeholder.com/150" className="alr-id " alt="Government ID" />
                 <img src="https://via.placeholder.com/150" className="alr-id" alt="Government ID" />
                 <img src="https://via.placeholder.com/150" className="alr-id" alt="Government ID" />
                  </div>
        </div>
    </div>
    </div>
  )
}

export default Alrdetails