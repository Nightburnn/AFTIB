import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { fetchHotelById } from "../../utils/adminOpsRequests";
import './viewHotel.css'
export default function ViewHotel() {
    let { id } = useParams();
    const [hotelData, setHotelData] = useState(null);
    const [agentData, setAgentData] = useState(null);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
  
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
  
    const handleReservation = (roomId) => {
      // Implement reservation logic
      console.log(`Reserving room ${roomId} from ${checkInDate} to ${checkOutDate}`);
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
          {hotelData.rooms.map((room) => (
            <div key={room.roomId} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{room.roomType}</h5>
                <p className="card-text">{room.description}</p>
                <p><strong>Price / Night:</strong> N{room.price}</p>
                <p><strong>Max Occupants:</strong> {room.maxOccupants}</p>
                <p><strong>Amenities:</strong> {room.amenities.join(", ")}</p>
                <div>
                  <h5>Images</h5>
                  <div className="d-flex flex-wrap">
                    {room.images.filter(x=>x).map((image, index) => (
                      <img key={index} src={image} alt={`Room image ${index + 1}`} className="room-image" />
                    ))}
                  </div>
                </div>
                <form className="mt-3">
                  <div className="form-group">
                    <label htmlFor="checkInDate">Check-In Date</label>
                    <input
                      type="date"
                      id="checkInDate"
                      className="form-control"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkOutDate">Check-Out Date</label>
                    <input
                      type="date"
                      id="checkOutDate"
                      className="form-control"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={() => handleReservation(room.roomId)}
                  >
                    Make Reservation
                  </button>
                </form>
              </div>
            </div>
          ))}
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