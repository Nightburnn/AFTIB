import React, {useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchHotelById } from "../../utils/adminOpsRequests";
import './viewHotel.css'
import { createTransaction } from "../../utils/transactionRequests";
import { useLoading } from "../../Components/LoadingContext";

import { Reservation } from "./Reservation";
export default function ViewHotel() {
    let { id } = useParams();
    const [hotelData, setHotelData] = useState(null);
    const [agentData, setAgentData] = useState(null);
    let {setLoading,setLoadingText} = useLoading()
    let navigate = useNavigate()

  
    const getListing = async () => {
      try {
        const response = await fetchHotelById(id);
        const data = response;
        setHotelData(data);
        setAgentData(data.agentData);
        console.log('data from hotels', data);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getListing();
    }, [id]);

    async function reqFunction () {
      try {
  
      } 
      catch {
  
      }
      finally{
        setTimeout(()=>{
          setLoading(false)
          setLoadingText('')
        },3000)
      }
    }
    const handleReservation = async ({room,checkInDate,checkOutDate,totalNights,pricePerNight,totalPrice}) => {
      let bookingDetails = {
        room,checkInDate,checkOutDate,totalNights,pricePerNight,totalPrice
      }
      let hotelId = id
      console.log({hotelId,bookingDetails})
      try {
          setLoading(true)
          setLoadingText('Creating Transaction.... Please wait')
          let created = await createTransaction({bookingDetails,hotelId,transactionType: "hotelBooking"})
          navigate(`/viewTransaction/${created.transaction.transactionId}?clientpov=true`)
      } 
      catch(err) {
        console.error(err.message)
      }
      finally{
        setTimeout(()=>{
          setLoading(false)
          setLoadingText('')
        },3000)
      }
      // Implement reservation logic
    };
  
    if (!hotelData || !agentData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="container mt-5">
        <h1 className="text-primary">{hotelData.name}</h1>
        <p>{hotelData.description}</p>
        <div>
          <h3>Images</h3>
          <div className="d-flex flex-wrap">
            {hotelData.images.map((image, index) => (
              <img key={index} src={image} alt={`Hotel image ${index + 1}`} className="hotel-image" />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3>Amenities</h3>
          <ul className="list-group">
            {hotelData.amenities.filter(x=>{
                return Object.values(x)[0]
            }).map((amenity, index) => (
              <li key={index} className="list-group-item">{Object.keys(amenity)[0]}: {Object.values(amenity)[0] ? "Yes" : "No"}</li>
            ))}
          </ul>
        </div>        <div className="mt-4">
          <h3>Make Reservation</h3>
          {hotelData.rooms.map(x=>{
           return <Reservation room={x} handleReservation={handleReservation} />
          })}

        </div>
        <div className="mt-4">
          <h3>Contact the Agent</h3>
          <p><strong>Name:</strong> {agentData.name}</p>
          <p><strong>Business Name:</strong> {agentData.businessName}</p>
          <p><strong>Email:</strong> {agentData.email}</p>
          <p><strong>Phone:</strong> {agentData.phone}</p>
          <p><strong>WhatsApp:</strong> {agentData.whatsappNo}</p>
          <p><strong>Office Address:</strong> {agentData.officeAddress}</p>
          <p><strong>State:</strong> {agentData.state}</p>
          <p><strong>LGA:</strong> {agentData.LGA}</p>
          <p><strong>Agency Type:</strong> {agentData.agencyType}</p>
        </div>
        <div className="mt-4">
          <h3>Hotel Support Contact</h3>
          <p>Email: {hotelData.contact.email}</p>
          <p>Phone: {hotelData.contact.phone}</p>
          <p>Website : <a href={hotelData.website} target="_blank" rel="noopener noreferrer">{hotelData.contact.website}</a></p>
        </div>
      </div>
    );
  }