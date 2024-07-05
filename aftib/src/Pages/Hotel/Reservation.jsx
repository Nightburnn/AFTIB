import React, { useState } from "react";

const calculateTotalNights = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const timeDifference = checkOut.getTime() - checkIn.getTime();
  const totalNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return totalNights;
};

export function Reservation({ room, handleReservation }) {
  const today = new Date().toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(today);

  const handleSubmit = () => {
    handleReservation({
      room,
      checkInDate,
      checkOutDate,
      totalNights: calculateTotalNights(checkInDate, checkOutDate),
      pricePerNight: room.price,
      totalPrice: calculateTotalNights(checkInDate, checkOutDate) * room.price
    });
  };

  return (
    <div className="room-details">
      <h5>Room Type: {room.roomType}</h5>
      <p className="card-text">{room.description}</p>
      <p><strong>Price / Night:</strong> N{room.price}</p>
      <p><strong>Max Occupants:</strong> {room.maxOccupants}</p>
      <p><strong>Amenities:</strong> {room.amenities.join(", ")}</p>
      <div className="images-section">
        
        <div className="d-flex flex-wrap">
          {room.images.filter(x => x).map((image, index) => (
            <img key={index} src={image} alt={`Room image ${index + 1}`} className="room-image" />
          ))}
        </div>
      </div>
      <div className="dates-section">
        <p><strong>Total Nights:</strong> {calculateTotalNights(checkInDate, checkOutDate)}</p>
        <p><strong>Total Price:</strong> N{calculateTotalNights(checkInDate, checkOutDate) * room.price}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="checkInDate">Check-In Date</label>
            <input
              type="date"
              id="checkInDate"
              min={today}
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
              min={checkInDate}
              className="form-control"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-2"
          >
            Make Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
