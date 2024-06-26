import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import sell from "../../assets/images/sell.png";
import sell1 from "../../assets/images/sell1.png";
import sell3 from "../../assets/images/sell3.png";
import sh1 from "../../assets/images/sh1.png";
import sh2 from "../../assets/images/sh2.png";
import sh3 from "../../assets/images/sh3.png";
import './PropertyDetails.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const [houseDetails, setHouseDetails] = useState(null);

  const convertDate = (timeEpoch) => {
    const date = new Date(timeEpoch);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    // Dummy data
    const dummyData = [
      {
        _id: "1",
        images: [sell, sell1, sell3],
        title: "Beautiful Family House",
        location: "123 Main St, Springfield",
        furnished: true,
        listingDate: 1627849200000,
        size: 2400,
        bedrooms: 4,
        bathrooms: 3,
        ownersContact: {
          phone: "555-1234"
        },
        price: "$350,000",
        description: "A beautiful family house located in the heart of the city.",
        balcony: true,
        garage: true,
        Security: true,
        Internet: true,
        lift: false,
        Cabletv: true,
        AC: true,
        RoofTerrace: false
      },
      {
        _id: "2",
        images: [sh1, sh2, sh3],
        title: "Modern Apartment",
        location: "456 Elm St, Metropolis",
        furnished: false,
        listingDate: 1627849200000,
        size: 1200,
        bedrooms: 2,
        bathrooms: 1,
        ownersContact: {
          phone: "555-5678"
        },
        price: "$220,000",
        description: "A modern apartment with all the amenities you need.",
        balcony: false,
        garage: false,
        Security: true,
        Internet: true,
        lift: true,
        Cabletv: false,
        AC: true,
        RoofTerrace: true
      }
    ];

    const sellDetails = dummyData.find((list) => list._id === id) || dummyData[0];
    setHouseDetails(sellDetails);
  }, [id]);

  if (!houseDetails) {
    return <div>Not loading</div>;
  }

  return (
    <div>
      <div className="container">
        <section className="text-center p-5 second-section">
          <div>
            <h2 className="text-start mb-2">listed properties</h2>
            <section className="d-flex flex-column flex-md-row p-5 align-items-center fourth">
              <div className="col-md-6">
                <img
                  src={houseDetails.images[0]}
                  alt="Description"
                  className="img-fluid"
                  width={500}
                />
              </div>
              <div className="col-md-6 mb-3 mb-md-0">
                <h2>{houseDetails.title}</h2>
                <p className="mt-3">{houseDetails.location}</p>
                <span className="mt-3">
                  {houseDetails.furnished ? "Furnished" : "Not Furnished"}
                </span>
                <p className="mt-3">{convertDate(houseDetails.listingDate)}</p>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    {houseDetails.size} sqt
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    {houseDetails.bedrooms} Beds
                  </small>
                  <small className="flex-fill text-center py-2">
                    {houseDetails.bathrooms} Baths
                  </small>
                </div>
                <p className="mt-3">{houseDetails.ownersContact.phone}</p>
                <p className="mt-3">{houseDetails.price}</p>
                <Link to="/sell">
                  <button className="btn mt-3" style={{ width: "200px" }}>
                    Back
                  </button>
                </Link>
              </div>
            </section>
          </div>
          <div className="container my-5 border border-1 border-dark">
            <div>
              <p className="text-justify">{houseDetails.description}</p>
            </div>
            <div className="house-d">
              {houseDetails.balcony ? (
                <p>
                  <FaCheck /> Balcony
                </p>
              ) : (
                <p>
                  <FaTimes /> Balcony
                </p>
              )}
              {houseDetails.garage ? (
                <p>
                  <FaCheck /> Garage
                </p>
              ) : (
                <p>
                  <FaTimes /> Garage
                </p>
              )}
              {houseDetails.Security ? (
                <p>
                  <FaCheck /> Security
                </p>
              ) : (
                <p>
                  <FaTimes /> Security
                </p>
              )}
              {houseDetails.Internet ? (
                <p>
                  <FaCheck /> Internet
                </p>
              ) : (
                <p>
                  <FaTimes /> Internet
                </p>
              )}
              {houseDetails.lift ? (
                <p>
                  <FaCheck /> Lift
                </p>
              ) : (
                <p>
                  <FaTimes /> Lift
                </p>
              )}
              {houseDetails.Cabletv ? (
                <p>
                  <FaCheck /> Cable TV
                </p>
              ) : (
                <p>
                  <FaTimes /> Cable TV
                </p>
              )}
              {houseDetails.AC ? (
                <p>
                  <FaCheck /> Air Conditioning
                </p>
              ) : (
                <p>
                  <FaTimes /> Air Conditioning
                </p>
              )}
              {houseDetails.RoofTerrace ? (
                <p>
                  <FaCheck /> Roof Terrace
                </p>
              ) : (
                <p>
                  <FaTimes /> Roof Terrace
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
