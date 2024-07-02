import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { nigerianStateData } from ".././Listing/data";
import {
  validateRequiredHotelData,
  generateAddHotelReqBody,
  addNewHotel,
} from "../../utils/hotelUtils";
import { fetchHotelById } from "../../utils/adminOpsRequests";
import { useNavigate,useLocation } from "react-router-dom";
import { useLoading } from "../../Components/LoadingContext";
import { RoomForm } from "./Room";

import { Modal } from "antd";
import axios from "axios";

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
  const routeLocation = useLocation();
  const queryParams = new URLSearchParams(routeLocation.search);
  let edit = queryParams.get('edit') ? true : false
  let id = queryParams.get('id')
  async function getListing(){
    try{
      let response = await fetchHotelById(id)
      console.log('in hotel page', response)
    }
    catch(err){
      console.error(err.message)
    }
  }
  useEffect(()=>{
    if(edit){
      getListing()
    }
    else {
      console.log('Not Edit')
    }
  },[])
  const emptyRoomData = {
    id: Date.now(),         // Unique identifier for the room
    type: '',               // Room type (e.g., suite, double, single)
    description: '',        // Detailed description of the room
    price: '',              // Price of the room
    amenities: [],          // List of amenities for the room
    images: [],             // URLs to images of the room
    maxOccupants: '',       // Maximum number of occupants for the room
    roomCount: ''           // Number of this type of room available in the hotel
  };
  const [rooms, setRooms] = useState([emptyRoomData]);

  const handleRoomChange = (id) => (key) => (e) => {
    const value = e.target.value;
    setRooms(rooms.map(room => (room.id === id ? { ...room, [key]: value } : room)));
  };

  const handleRoomAdd = () => {
    setRooms([...rooms, { ...emptyRoomData, id: Date.now() }]);
  };

  const handleRoomDelete = (id) => () => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const updateRoomImages = (id, images) => {
    setRooms(rooms.map(room => (room.id === id ? { ...room, images } : room)));
  };

  const updateAmenities = (id, amenities) => {
    setRooms(rooms.map(room => (room.id === id ? { ...room, amenities } : room)));
  };

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
  let imageInput = useRef(null);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images, file];
      const newPreviews = [...previews, URL.createObjectURL(file)];
      setImages(newImages);
      setPreviews(newPreviews);
      imageInput.current.value = null;
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };
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

  async function submitForm() {
    let valid = validateRequiredHotelData(formValues);
    console.log(valid.valid,rooms);
    if (valid.valid) {
      let amenities;
      amenities = Object.keys(checks).map((x) => {
        return { [x]: checks[x].selected };
      });
      let requestBody = generateAddHotelReqBody({ formValues, amenities });
      try {
        setLoading(true);
        setLoadingText('Uploading Data')
        let response = await addNewHotel(requestBody, token);
        console.log({response})
        setLoadingText('Uploading Images')
        const formData = new FormData();
        let files = images;
        if (files.length > 0) {
          // Create a FormData object
          for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
          }
        }
        let reqId = response.data.hotel.id
        console.log({reqId})
        let addImages = await axios.put(`https://aftib-6o3h.onrender.com/hotels/addImages/${response.data.hotel._id}`,formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              // Include any other headers you need, such as authorization
            }
          })
          setLoadingText('done uploading')
          setModalTitle("Successfully Added the hotel details.");
          setModalBody(
            "Your Hotel has been submitted to the admins. They would review it and get back to you within the next 1 - 24 hours. Thanks",
          );
        console.log({ response: response.data });
      } catch (err) {
          setModalTitle("Error Occured");
          setModalBody(err.message);
        console.error(err.message);
      }
      finally {
        setTimeout(()=>{
          setShowModal(true);
          setLoading(false);
        },3000)
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
  <h2 className="listing-title">Hotel</h2>
  <form onSubmit={handleSubmit} className="listing-container">
    <section className="form-section">
      <h4 className="section-title py-2">Main Information</h4>
      <div className="form-group mb-3">
        <label className="form-label mb-1">Hotel Name</label>
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
        <label className="form-label mb-1">Description</label>
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
        <label className="form-label mb-1">Full Address</label>
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
          <label className="form-label mb-1">State</label>
          <select
            className="form-control"
            name="state"
            id="state"
            value={formValues.state}
            onChange={handleChange}
          >
            {Object.keys(nigerianStateData).map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 mb-2">
          <label className="form-label mb-1">Local Government Area</label>
          <select
            className="form-control"
            name="LGA"
            id="LGA"
            value={formValues.LGA}
            onChange={handleChange}
          >
            {nigerianStateData[formValues.state].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      </div>
    </section>

    <section className="form-section">
      <h4 className="section-title">Rooms Available</h4>
      <p>Add information about the rooms and services this hotel has here.</p>
     
    
      {rooms.map((room, index) => (
        <div className="room-container p-2 border-gray mb-3" key={room.id}>
         
        <b>Room {index + 1}</b>
          <RoomForm
            room={room}
            onChange={handleRoomChange(room.id)}
            onDelete={handleRoomDelete(room.id)}
          />
          <div className="form-group mb-3">
            <label className="form-label mb-1">Upload Room Image</label>
            <div className="input-group">
             
              <input type="file" className="form-control-file" />
         
            </div>
           
          </div>
          <div className="form-group  mb-3">
            <label className="form-label mb-1">Amenities</label>
            <div className="form-group row mb-2">
               <div className="col-sm-10">
              <select className="form-control">
                {Object.keys(checks).map((option, index) => (
                  <option key={index}>{checks[option].displayTitle}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-2">
              <button type="button" className="btn blue">Add</button>
            </div>
            </div>
           
          </div>
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn danger"
              onClick={() => handleRoomDelete(room.id)}
            >
              Delete Room
            </button>
          </div>
        </div>
      ))}
      <div className="d-grid mt-4">
        <button type="button" className="btn blue mb-4" onClick={handleRoomAdd}>
          Add New Room
        </button>
      </div>
    </section>

    <section className="form-section">
      <h4 className="section-title py-2">Contact Section</h4>
      <div className="row">
        <div className="col-sm-6 mb-2">
          <label className="form-label mb-1">Contact Phone</label>
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
          <label className="form-label mb-1">Contact Email</label>
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
          <label className="form-label mb-1">Website</label>
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
    </section>

    <section className="form-section">
      <h4 className="section-title py-2">Extra Information</h4>
      <div className="form-group mb-3">
        <label className="form-label mb-1">Amenities</label>
        <div className="row">
          {Object.keys(checks).map((option, index) => (
            <div className="col-md-4 col-sm-6 py-1 px-3" key={index}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  checked={checks[option].selected}
                  onChange={() => updateCheck(option)}
                  type="checkbox"
                  id={`checkbox${index}`}
                />
                <label className="form-check-label" htmlFor={`checkbox${index}`}>
                  {checks[option].displayTitle}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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

      <div className="col-xs-12 gallery-listing mb-3">
          <div className="form-group mt-4">
            <h2>Gallery</h2>
            <p>Upload the images for the listings one after the other</p>
            <div className="listing-gallery">
              <form id="uploadForm">
                <p>
                  <b>{images.length > 0 ? "Upload Another One" : ""}</b>
                </p>

                <input
                  type="file"
                  id="fileInput"
                  placeholder="Add Image"
                  name="files"
                  onChange={handleImageUpload}
                  ref={imageInput}
                />
                <div className="my-5 row justify-content-center">
                  {previews.map((preview, index) => (
                    <div
                      className="col-8 col-md-5 col-lg-4 position-relative"
                      key={index}
                    >
                      <img
                        src={preview}
                        alt={`preview-${index}`}
                        className="img-fluid previewImage"
                      />
                      <button
                        type="button"
                        className="btn btn-danger position-absolute top-0 end-0"
                        onClick={() => handleDeleteImage(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </form>
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
