import { useState } from "react";
const calculateTotalNights = (checkInDate, checkOutDate) => {
    // Convert date strings to Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
  
    // Calculate the time difference in milliseconds
    const timeDifference = checkOut.getTime() - checkIn.getTime();
  
    // Calculate the total number of nights by converting milliseconds to days
    const totalNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return totalNights;
  };
export function Reservation ({room,handleReservation}) {
    const today = new Date().toISOString().split("T")[0];
    const [checkInDate, setCheckInDate] = useState(today);
    const [checkOutDate, setCheckOutDate] = useState(today);

    return (
        <div>
            <div key={room.roomId} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Room Type: {room.roomType}</h5>
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
                <p><strong>Total Nights:</strong> {calculateTotalNights(checkInDate,checkOutDate)}</p>
                <p><strong>Total Price: {calculateTotalNights(checkInDate,checkOutDate) * room.price}</strong></p>
                <form className="mt-3">
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
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={() => handleReservation({
                        room,
                        checkInDate,
                        checkOutDate,
                        totalNights: calculateTotalNights(checkInDate,checkOutDate),
                        pricePerNight: room.price,
                        totalPrice: calculateTotalNights(checkInDate,checkOutDate) * room.price
                    })}
                  >
                    Make Reservation
                  </button>
                </form>
              </div>
              <div className="my-3" />
            </div>
        </div>
    )
}