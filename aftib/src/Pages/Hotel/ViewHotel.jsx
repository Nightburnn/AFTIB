import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchHotelById } from "../../utils/adminOpsRequests";
import './viewHotel.css';
import { createTransaction } from "../../utils/transactionRequests";
import { useLoading } from "../../Components/LoadingContext";
import { Reservation } from "./Reservation";

export default function ViewHotel() {
    let { id } = useParams();
    const [hotelData, setHotelData] = useState(null);
    const [agentData, setAgentData] = useState(null);
    let { setLoading, setLoadingText } = useLoading();
    let navigate = useNavigate();

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

    const handleReservation = async ({ room, checkInDate, checkOutDate, totalNights, pricePerNight, totalPrice }) => {
        let bookingDetails = {
            room, checkInDate, checkOutDate, totalNights, pricePerNight, totalPrice
        };
        let hotelId = id;
        console.log({ hotelId, bookingDetails });
        try {
            setLoading(true);
            setLoadingText('Creating Transaction.... Please wait');
            let created = await createTransaction({ bookingDetails, hotelId, transactionType: "hotelBooking" });
            navigate(`/viewTransaction/${created.transaction.transactionId}?clientpov=true`);
        } catch (err) {
            console.error(err.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
                setLoadingText('');
            }, 3000);
        }
    };

    if (!hotelData || !agentData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <h1 className="hotel-title">{hotelData.name}</h1>
            <p className="hotel-subtitle">{hotelData.description}</p>
            <div className="hotel-images-section">
                <div className="d-flex flex-wrap hotel-images">
                    {hotelData.images.map((image, index) => (
                        <img key={index} src={image} alt={`Hotel image ${index + 1}`} className="hotel-image" />
                    ))}
                </div>
            </div>
            <div className="hotel-amenities mt-4">
                <h3>Amenities</h3>
                <div className="amenities-list">
                    {hotelData.amenities.filter(x => Object.values(x)[0]).map((amenity, index) => (
                        <div key={index} className="amenity-item">{Object.keys(amenity)[0]}</div>
                    ))}
                </div>
            </div>
            <div className="make-reservation-section mt-4">
                <h3>Make a Reservation</h3>
                <div className="reservation-images">
                    {hotelData.rooms.map((room, index) => (
                        <Reservation key={index} room={room} handleReservation={handleReservation} />
                    ))}
                </div>
            </div>
            <div className="mt-4 contact-section">
                <div className="contact-agent">
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
                <div className="contact-form">
                    <h3>Contact Form</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" id="message" rows="3" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <div className="hotel-support-contact mt-2 mb-5">
                <h3>Hotel Support Contact</h3>
                <p><strong>Email:</strong> {hotelData.contact.email}</p>
                <p><strong>Phone:</strong> {hotelData.contact.phone}</p>
                <p><strong>Website:</strong> <a href={hotelData.website} target="_blank" rel="noopener noreferrer">{hotelData.contact.website}</a></p>
            </div>
        </div>
    );
}
