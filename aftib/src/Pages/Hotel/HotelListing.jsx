import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { nigerianStateData } from ".././Listing/data";
import {
  validateRequiredHotelData,
  generateAddHotelReqBody,
  addNewHotel,
} from "../../utils/hotelUtils";

import { useNavigate } from "react-router-dom";
import { useLoading } from "../../Components/LoadingContext";

import { Modal } from "antd";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Listing = () => {
  let token = window.localStorage.getItem("accessToken");
  let navigate = useNavigate();
  let [showModal, setShowModal] = useState(false);
  let [modalTitle, setModalTitle] = useState("");
  let [modalBody, setModalBody] = useState("");
  let { setLoading, setLoadingText } = useLoading();
  const [position, setPosition] = useState({
    lat: 6.447809299999999,
    lng: 3.4723495,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [images, setImages] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    address: "",
    LGA: "Aba North",
    state: "Abia",
    phone: "",
    email: "",
    website: "",
  });

  let [checks, setChecks] = useState({
    spa: { displayTitle: "SPA", selected: false },
    pool: { displayTitle: "Pool", selected: false },
    gym: { displayTitle: "Gym", selected: false },
    freeWifi: { displayTitle: "Free Wi-Fi", selected: false },
    restaurant: { displayTitle: "Restaurant", selected: false },
    bar: { displayTitle: "Bar", selected: false },
    airConditioning: { displayTitle: "Air Conditioning", selected: false },
    parking: { displayTitle: "Parking", selected: false },
    roomService: { displayTitle: "Room Service", selected: false },
    laundryService: { displayTitle: "Laundry Service", selected: false },
    shuttleService: { displayTitle: "Shuttle Service", selected: false },
    petFriendly: { displayTitle: "Pet Friendly", selected: false },
    nonSmokingRooms: { displayTitle: "Non-Smoking Rooms", selected: false },
    businessCenter: { displayTitle: "Business Center", selected: false },
    meetingRooms: { displayTitle: "Meeting Rooms", selected: false },
    familyRooms: { displayTitle: "Family Rooms", selected: false },
    accessibleRooms: { displayTitle: "Accessible Rooms", selected: false },
    breakfastIncluded: { displayTitle: "Breakfast Included", selected: false },
    conciergeService: { displayTitle: "Concierge Service", selected: false },
    luggageStorage: { displayTitle: "Luggage Storage", selected: false },
    freeToiletries: { displayTitle: "Free Toiletries", selected: false },
    hairDryer: { displayTitle: "Hair Dryer", selected: false },
    tv: { displayTitle: "TV", selected: false },
    minibar: { displayTitle: "Minibar", selected: false },
    safe: { displayTitle: "Safe", selected: false },
    balcony: { displayTitle: "Balcony", selected: false },
    coffeeMaker: { displayTitle: "Coffee Maker", selected: false },
    ironAndIroningBoard: {
      displayTitle: "Iron and Ironing Board",
      selected: false,
    },
    telephone: { displayTitle: "Telephone", selected: false },
    heating: { displayTitle: "Heating", selected: false },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const updateCheck = (option) => {
    let bool = !checks[option].selected;
    let updated = {
      ...checks,
      [option]: { displayTitle: checks[option].displayTitle, selected: bool },
    };
    setChecks(updated);
    console.log("updated", bool, updated);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    uploadFiles(files);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    uploadFiles(files);
  };

  const uploadFiles = (files) => {
    const newImages = files
      .slice(0, 5 - images.length)
      .map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5));
  };

  const removeImage = (index) => {
    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);
  };

  async function submitForm() {
    let valid = validateRequiredHotelData(formValues);
    console.log(valid.valid);
    if (valid.valid) {
      let amenities;
      amenities = Object.keys(checks).map((x) => {
        return { [x]: checks[x].selected };
      });
      let requestBody = generateAddHotelReqBody({ formValues, amenities });
      try {
        setLoading(true);
        let response = await addNewHotel(requestBody, token);
        setShowModal(true);
        setModalTitle("Successfully Added the hotel details.");
        setModalBody(
          "Your Hotel has been submitted to the admins. They would review it and get back to you within the next 1 - 24 hours. Thanks",
        );
        setLoading(false);
        console.log({ response: response.data });
      } catch (err) {
        setLoading(false);
        setShowModal(true);
        setModalTitle("Error Occured");
        setModalBody(err.message);

        console.error(err.message);
      }
    }
  }
  const handleOk = () => {
    setShowModal(false);
    navigate("/agent-dashboard");
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  function DraggableMarker() {
    const markerRef = useMapEvents({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log({ newPosition: marker.getLatLng() });
        }
      },
    });

    return (
      <Marker
        draggable={true}
        eventHandlers={{
          dragend() {
            const marker = markerRef.current;
            if (marker != null) {
              setPosition(marker.getLatLng());
            }
          },
        }}
        position={position}
        ref={markerRef}
      />
    );
  }

  const handleSearch = () => {
    setPosition({ lat: 52.52, lng: 13.405 });
  };

  return (
    <div className="container mt-5">
      <Modal
        title={modalTitle}
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={"Try Again"}
      >
        <p>{modalBody}</p>
      </Modal>
      <div className="row">
        <div className="col-md-6 listing">
          <h2>Hotel</h2>
          <form onSubmit={handleSubmit} className="listing-container">
            <h4 className="py-2">Main Informations</h4>
            <div className="form-group mb-3">
              <label className="mb-1">Hotel Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Z hotel"
                name="name"
                id="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-1">Description</label>
              <textarea
                className="form-control"
                placeholder="Detailed description of the hotel"
                rows="4"
                name="description"
                id="description"
                value={formValues.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label className="mb-1">Full Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., 23A, Ikori Street, OJB road, Agege, Lagos."
                name="address"
                id="address"
                value={formValues.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-12 mb-2">
                <label className="mb-1">State</label>
                <select
                  className="form-control"
                  name="state"
                  id="state"
                  value={formValues.state}
                  onChange={handleChange}
                >
                  {Object.keys(nigerianStateData).map((x) => {
                    return <option>{x}</option>;
                  })}
                </select>
              </div>
              <div className="col-sm-12 mb-2">
                <label className="mb-1">Local Government Area</label>
                <select
                  className="form-control"
                  name="LGA"
                  id="LGA"
                  value={formValues.LGA}
                  onChange={handleChange}
                >
                  {nigerianStateData[formValues.state].map((x) => {
                    return <option>{x}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="form-group row mb-3">
              <h4 className="py-2">Contact Section</h4>
              <div className="col-sm-6 mb-2">
                <label className="mb-1">Contact Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  id="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-2">
                <label className="mb-1">Contact Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 mb-2">
                <label className="mb-1">Website</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="Website URL"
                  name="website"
                  id="website"
                  value={formValues.website}
                  onChange={handleChange}
                />
              </div>
            </div>
            <h4 className="py-2">Extra Information</h4>
            <div className="form-group mb-3">
              <label className="mb-1">Amenities</label>
              <div className="row">
                {Object.keys(checks).map((option, index) => {
                  return (
                    <div
                      className="py-1 px-3"
                      key={index}
                      style={{ width: "max-content" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          checked={checks[option].selected}
                          onChange={() => updateCheck(option)}
                          type="checkbox"
                          id={`checkbox${index}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`checkbox${index}`}
                        >
                          {checks[option].displayTitle}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6 local">
          <h2>Localization</h2>
          <div className="local-list">
            <div className="form-group row mb-3">
              <div className="col-sm-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Localization"
                />
              </div>
              <div className="col-sm-6">
                <button className="btn localbtn " onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            <p>Or drag the marker to property position</p>

            <div className="map-container mb-3">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <DraggableMarker />
              </MapContainer>
            </div>

            <div className="form-group row">
              <div className="col-sm-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={position.lat}
                  readOnly
                  placeholder="Latitude"
                />
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  value={position.lng}
                  readOnly
                  placeholder="Longitude"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <button className="btn listbtn  mt-3" onClick={submitForm}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Listing;
