import React, { useState, useRef,useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Listing.css";
import L from "leaflet";
import { nigerianStateData } from "./data";
import { Modal } from "antd";
import { useLoading } from "../../Components/LoadingContext";
import { useLocation, useNavigate } from "react-router-dom";
import { checkRequiredData } from "../../utils/processListing";
import { fetchListingById } from "../../utils/adminOpsRequests";
import axios from "axios";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Listing = () => {
  let token = window.localStorage.getItem("accessToken");
  let navigate = useNavigate()
  const routeLocation = useLocation();
  const queryParams = new URLSearchParams(routeLocation.search);
  let edit = queryParams.get('edit') ? true : false
  let id = queryParams.get('id')
  let [previousImages,setPreviousImages] = useState([])
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const handleImageDelete = (index) => {
    const newImages = previousImages.filter((_, i) => i !== index);
    setPreviousImages(newImages);
    setImagesToRemove([...imagesToRemove, previousImages[index]]);
  };

  const getListing = async () => {
    try {
      const response = await Promise.resolve(fetchListingById(id));
      const data = response.listing
      console.log(data)
      setPreviousImages(data.images || [])
      // Populate formValues state
      setFormValues({
        title: data.title || "",
        description: data.description || "",
        saleType: data.saleType || "",
        propertyType: data.propertyType || "",
        size: data.size || "",
        bedrooms: data.bedrooms || "",
        bathrooms: data.bathrooms || "",
        estate: data.estate || "",
        yearBuilt: data.yearBuilt || "",
        price: data.price || "",
        monthlyRentPayment: data.monthlyRentPayment || "",
        monthlyShortLetPrice: data.monthlyShortLetPrice || "",
        location: data.location || "",
        state: data.state || "Abia",
        LGA: data.LGA || "Aba North",
        ownerName: data.ownersContact?.name || "",
        ownerPhone: data.ownersContact?.phone || "",
        ownerEmail: data.ownersContact?.email || "",
        virtualTour: data.virtualTour || "",
        neighborhood: data.neighborhood || "",
        propertyStatus: data.propertyStatus || "Available",
        energyRating: data.energyRating || "",
        nearbySchools: data.nearbySchools.join(", ") || "",
        transportation: data.transportation || "",
        floorNumber: data.floorNumber || "",
        agentName: data.agentContact?.name || "",
        agentPhone: data.agentContact?.phone || "",
        agentEmail: data.agentContact?.email || "",
      });

      // Populate checks state
      setChecks({
        Garage: data.garage || false,
        Garden: data.garden || false,
        Balcony: data.balcony || false,
        "Pets Allowed": data.petsAllowed || false,
        Furnished: data.furnished || false,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  let [showModal, setShowModal] = useState(false);
  let [modalTitle, setModalTitle] = useState("");
  let [modalBody, setModalBody] = useState("");
  let { setLoading, setLoadingText } = useLoading();
  let imageInput = useRef(null);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const handleOk = () => {
    setShowModal(false);
  }
  const handleCancel = () => {
    setShowModal(false);
  }
  const [developmentStage, setDevelopmentStage] = useState("urban");
  function updateDevelopmentStage(e) {
    setDevelopmentStage(e.target.value);
  }
  const [position, setPosition] = useState({
    lat: 6.447809299999999,
    lng: 3.4723495,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
    title: "",
    description: "",
    saleType: "",
    propertyType: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    estate: "",
    yearBuilt: "",
    price: "",
    monthlyRentPayment: "",
    monthlyShortLetPrice: "",
    location: "",
    state: "Abia",
    LGA: "Aba North",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    virtualTour: "",
    neighborhood: "",
    propertyStatus: "Available",
    energyRating: "",
    nearbySchools: "",
    transportation: "",
    floorNumber: "",
    agentName: "",
    agentPhone: "",
    agentEmail: "",
  });
  const [checks, setChecks] = useState({
    Garage: false,
    Garden: false,
    Balcony: false,
    "Pets Allowed": false,
    Furnished: false,
  });

  useEffect(()=>{
    if(edit){
      getListing()
    }
    else {
      console.log('Not Edit')
    }
  },[])
  const updateCheck = (option) => {
    let bool = !checks[option];
    let updated = { ...checks, [option]: bool };
    setChecks(updated);
    console.log("updated", bool, updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  async function submitForm() {
    // this function only checks the required values and make sure that they have been filled
    let validate = checkRequiredData({ ...formValues });
    // run validation for the phone numbers and the emails
    let requestBody = {
      ownersContact: {
        name: formValues.ownerName,
        phone: formValues.ownerPhone,
        email: formValues.ownerEmail,
      },
      agentsContact: {
        name: formValues.agentName,
        phone: formValues.agentPhone,
        email: formValues.agentEmail,
      },
      petsAllowed: checks["Pets Allowed"],
      developmentStage,
      ...checks,
      ...formValues,
    };
    if(edit){
      requestBody.images = previousImages
    }
    console.log(edit,validate.message)
    if (!validate.valid) return;
    try {
      setLoading(true)
      setLoadingText(edit?'Updating your listing':'Adding your listing')
      let addListing = !edit ? await axios.post(
        "https://aftib-6o3h.onrender.com/listing/addListing",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      ) : await axios.put(`https://aftib-6o3h.onrender.com/listing/updateListing/${id}`,
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log({ res: addListing.data });
      const formData = new FormData();
      let files = images;
      if (files.length > 0) {
        // Create a FormData object
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }
      setLoadingText('Adding images')
      // Make an Axios POST request to the add listing image endpoint
      const result = await axios.put(
        `https://aftib-6o3h.onrender.com/listing/addListingImages/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            // Include any other headers you need, such as authorization
          },
        },
      );
      setLoadingText('Successful')
      console.log("Images uploaded successfully", result.data);
    } catch (err) {
      console.error(err.message);
    }
    finally{
      setTimeout(()=>{
        setLoading(false)
        navigate('/agent-dashboard')
      },3000)
    }
  }

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
          <h2>Listing</h2>
          <form onSubmit={handleSubmit} className="listing-container">
            <div className="form-group mb-3">
              <label className="mb-1">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="eg, A luxury duplex in lekki."
                name="title"
                id="title"
                value={formValues.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group row mb-3">
              <div className=" col-sm-12 mb-3">
                <label className="mb-1">
                  Description: Add more details about the property
                </label>
                <textarea
                  placeholder="Example: This luxury duplex in lekki sits on a 75 square kilometer land space, it has ...., it also features..... Add other details as necessary"
                  className="form-control"
                  rows="4"
                  name="description"
                  id="description"
                  value={formValues.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-sm-12">
                <label className="mb-1">
                  Is this property for sale, for rent or a shortlet?
                </label>
                <select
                  className="form-control"
                  name="saleType"
                  id="saleType"
                  value={formValues.saleType}
                  onChange={handleChange}
                >
                  <option>Select Option</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                  <option>Short Let</option>
                </select>
              </div>
            </div>

            <div className="form-group row mb-3">
              <div className="col-sm-6 mb-2">
                <label className="mb-1">
                  What type of property is this? House, Land, Apartment...
                </label>
                <select
                  className="form-control"
                  name="propertyType"
                  id="propertyType"
                  value={formValues.propertyType}
                  onChange={handleChange}
                >
                  <option>Select Option</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Land</option>
                  <option>Villa</option>
                  <option>Duplex</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="mb-1">
                  What is the size of this property in Square Meters (m
                  <sup>2</sup>)
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="70 (sqm)"
                  name="size"
                  id="size"
                  value={formValues.size}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group row mb-3">
              <div className="col-sm-6 mb-2">
                <label className="mb-1">How many bedrooms?</label>
                <select
                  className="form-control"
                  name="bedrooms"
                  id="bedrooms"
                  value={formValues.bedrooms}
                  onChange={handleChange}
                >
                  <option>Select Option</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="mb-1">How many bathrooms?</label>
                <select
                  className="form-control"
                  name="bathrooms"
                  id="bathrooms"
                  value={formValues.bathrooms}
                  onChange={handleChange}
                >
                  <option>Select Option</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
            </div>

            <div className="form-group row mb-3">
              <div className="col-sm-12 mb-2">
                <label className="mb-1">
                  Is this property in an estate? If yes, what is the name of the
                  estate.(optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Example: Peace Estate"
                  name="estate"
                  id="estate"
                  value={formValues.estate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-6">
                <label className="mb-1">
                  What year was this property built? (Optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Year built"
                  name="yearBuilt"
                  id="yearBuilt"
                  value={formValues.yearBuilt}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <label className="mb-1">Property Availability</label>
                <select
                  className="form-control"
                  name="propertyStatus"
                  id="propertyStatus"
                  value={formValues.propertyStatus}
                  onChange={handleChange}
                >
                  <option>Available</option>
                  <option>Rented</option>
                  <option>Sold</option>
                  <option>Under Shortlet Contract</option>
                  <option>Available in 1 month</option>
                  <option>Available in 3 months</option>
                  <option>Available in 6 months</option>
                </select>
              </div>
            </div>
            <div className="form-group mb-3">
              <h6 className="col-form-label">Pricing Information (required)</h6>
              <div className="row">
                {(formValues.saleType == "For Sale" && (
                  <div className="col-sm-12 mb-2">
                    <label className="col-form-label">
                      How much is this property (Naira){" "}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      name="price"
                      id="price"
                      value={formValues.price}
                      onChange={handleChange}
                    />
                  </div>
                )) ||
                  (formValues.saleType == "For Rent" && (
                    <div className="col-sm-12">
                      <label className="col-form-label">
                        Monthly Rent Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Monthly Rent Payment"
                        name="monthlyRentPayment"
                        id="monthlyRentPayment"
                        value={formValues.monthlyRentPayment}
                        onChange={handleChange}
                      />
                    </div>
                  )) ||
                  (formValues.saleType == "Short Let" && (
                    <div className="col-sm-12">
                      <label className="col-form-label">
                        Monthly Short Let Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Monthly Short Let Price"
                        name="monthlyShortLetPrice"
                        id="monthlyShortLetPrice"
                        value={formValues.monthlyShortLetPrice}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                <div className="col-sm-12">
                  <h3>Area Development Stage?</h3>
                  <div class="form-group">
                    <div style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          type="radio"
                          value="urban"
                          checked={developmentStage === "urban"}
                          onChange={updateDevelopmentStage}
                          style={{ marginRight: "5px" }}
                        />
                        Urban
                      </label>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          type="radio"
                          value="rural"
                          checked={developmentStage === "rural"}
                          onChange={updateDevelopmentStage}
                          style={{ marginRight: "5px" }}
                        />
                        Rural
                      </label>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          type="radio"
                          value="developing"
                          checked={developmentStage === "developing"}
                          onChange={updateDevelopmentStage}
                          style={{ marginRight: "5px" }}
                        />
                        Developing
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <label className="col-form-label">Full Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Example: 23A, Ikori Street, OJB road, Agege, Lagos."
                    name="location"
                    id="location"
                    value={formValues.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label className="mb-1">Select State</label>
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
                <div className="col-sm-6 mb-2">
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
            </div>

            <div className="form-group mb-3">
              <label className="col-form-label">Owner's Contact</label>
              <div className="row">
                <div className="col-sm-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="ownerName"
                    id="ownerName"
                    value={formValues.ownerName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    name="ownerPhone"
                    id="ownerPhone"
                    value={formValues.ownerPhone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="ownerEmail"
                    id="ownerEmail"
                    value={formValues.ownerEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="col-form-label">Agent's Contact</label>
              <div className="row">
                <div className="col-sm-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="agentName"
                    id="agentName"
                    value={formValues.agentName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    name="agentPhone"
                    id="agentPhone"
                    value={formValues.agentPhone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="agentEmail"
                    id="agentEmail"
                    value={formValues.agentEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
              <h6 className="col-form-label">Additional Informations</h6>
              <div className="row">
                <div className="col-sm-12 mb-2">
                  <label className="col-form-label">
                    Add link for virtual tour (optional)
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Virtual Tour URL"
                    name="virtualTour"
                    id="virtualTour"
                    value={formValues.virtualTour}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-12 mb-2">
                  <label className="col-form-label">
                    Neighborhood Details (optional)
                  </label>
                  <textarea
                    style={{ height: 110 }}
                    className="form-control"
                    placeholder="Example: There is a mall about 1km from the property. The property is also close to the new lagos train..... Add more details as necessary."
                    name="neighborhood"
                    id="neighborhood"
                    value={formValues.neighborhood}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
              <div className="row">
                <div className="col-sm-12 mb-2">
                  <label className="col-form-label">
                    Add schools in the area? (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="eg, Royal Kids School, Burkhart Academy... Add more separated by commas."
                    name="nearbySchools"
                    id="nearbySchools"
                    value={formValues.nearbySchools}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-12 mb-2">
                  <label className="col-form-label">
                    Add transportation options in area? (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="eg, Bus Terminal 2km away from property"
                    name="transportation"
                    id="transportation"
                    value={formValues.transportation}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-12">
                  <label className="col-form-label">
                    What floor is the apartment. <br /> Note: Only answer if the
                    property is an apartment for rent or short_let.(Optional)
                  </label>
                  <select
                    className="form-control"
                    name="floorNumber"
                    id="floorNumber"
                    value={formValues.floorNumber}
                    onChange={handleChange}
                  >
                    <option>Select Option</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <h6 className="col-form-label">Extra Details</h6>
                {Object.keys(checks).map((option, index) => (
                  <div className="col-6 col-sm-4 mb-2" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        checked={checks[option]}
                        onChange={() => updateCheck(option)}
                        type="checkbox"
                        id={`checkbox${index}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`checkbox${index}`}
                      >
                        {option}
                      </label>
                    </div>
                  </div>
                ))}
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
          <div>
            <h4>Previously Uploade Images</h4>
            <div>
            <div className="row justify-content-center">
        {previousImages.map((image, index) => (
          <div key={index} className="col-8 col-md-5 col-lg-4 position-relative">
            <img src={image} alt={`Previous Image ${index}`} className="img-fluid" />
            <button
              type="button"
              className="btn btn-danger position-absolute"
              style={{ top: 10, right: 10 }}
              onClick={() => handleImageDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
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
