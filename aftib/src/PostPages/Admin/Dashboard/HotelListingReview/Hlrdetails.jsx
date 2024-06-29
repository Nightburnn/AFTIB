import React,{useEffect, useState} from 'react'
import { approveHotel, fetchHotelById } from '../../../../utils/adminOpsRequests';
import { useLoading } from '../../../../Components/LoadingContext';
import { useParams } from 'react-router-dom';

const Hlrdetails = () => {
  let token = window.localStorage.getItem("accessToken");
  let {id} = useParams()
  let { setLoading, setLoadingText } = useLoading();
  const [hotel, setHotel] = useState(null);

  async function getById () {
    try {
      setLoading(true)
      setLoadingText('Getting hotel Information') // Replace with the actual hotel ID
    const fetchedHotel = await fetchHotelById(id);
    console.log({response: fetchedHotel})
    setHotel(fetchedHotel);
    }
    catch(error){
      console.error(error.message)
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(()=>{
    getById()
  },[])

  async function sendApproveRequest () {
    try {
      setLoading(true)
      setLoadingText('Approving')// Replace with the actual hotel ID
    const fetchedHotel = await approveHotel(id,token);
    setHotel(fetchedHotel);
    }
    catch(error){
      console.error(error.message)
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div className="container mt-3">
    <div className="py-2 agent">
        <h1 className="text-center">Hotel Details</h1>
      </div>

        <div className="row mt-4">
            <div className="section border">
                <h2 className="text-center">Main Information</h2>
                <div className="info-agent">
                <p><strong>Nme:</strong> Aluxury duplex in lekki </p>
          <p><strong>Address:</strong>This luxury duplex in lekki sits on a 75 square kilometer</p>
          <p><strong>State:</strong> For Sale </p>
          <p><strong>LGA:</strong> Apartment </p>
           </div>
        </div>

        <div className="section border">
           <h2 className="text-center">Contact Information</h2>
              <div className="info-agent">
                <p><strong>Phone Number:</strong> 0123456789 </p>
                <p><strong>Email:</strong> example@gmail.com </p>
                <p><strong>Website:</strong>url.com </p>
              </div>
        </div>
        <div className="section border">
            <h2 className="text-center">Agent Information</h2>
            <div className="info-agent">
                <p className="text-center">This Hotel was listed by NameofAgent</p>
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
          <button onClick={sendApproveRequest} className="btn blue approval-btn">Approve This Request</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Hlrdetails