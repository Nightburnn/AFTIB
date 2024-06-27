import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {nigerianStateData} from '.././Listing/data'
import { checkRequiredData } from '../../utils/processListing';
import axios from 'axios';
import { Link } from 'react-router-dom';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Listing = () => {
  let token = window.localStorage.getItem('accessToken')
  let imageInput = useRef(null)
  const [images, setImages] = useState([])
  
  const [position, setPosition] = useState({lat: 6.447809299999999, lng: 3.4723495});
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    address: '',
    location: {
        city: '',
        state: '',
        country: '',
        zipCode: ''
    },
    contact: {
        phone: '',
        email: '',
        website: ''
    },
    amenities: '',
    rooms: '', // This could be an array, but to keep it simple, we'll start with an empty string
    images: '',
    ratings: '', // This could be an array, but to keep it simple, we'll start with an empty string
    averageRating: '',
    policies: '', // This could be an object, but to keep it simple, we'll start with an empty string
    nearbyAttractions: '',
    createdBy: ''
});

const [checks, setChecks] = useState({
    Pool: false,
    Gym: false,
    Spa: false,
    'Free WiFi': false,
    Parking: false
});


  const updateCheck = (option) => {
    let bool = !checks[option]
    let updated = {...checks,[option]: bool}
    setChecks(updated)
    console.log('updated', bool, updated)
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
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
    const newImages = files.slice(0, 5 - images.length).map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages].slice(0, 5));
  };

  const removeImage = (index) => {
    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);
  }

  async function submitForm(){
    // this function only checks the required values and make sure that they have been filled
    let validate = checkRequiredData({...formValues})
    // run validation for the phone numbers and the emails
    let requestBody = {
      ownersContact: {
        name: formValues.ownerName,phone: formValues.ownerPhone,email: formValues.ownerEmail
      },
      agentsContact: {
        name: formValues.agentName,phone: formValues.agentPhone,email: formValues.agentEmail
      },
      petsAllowed: checks['Pets Allowed'],
      ...checks,
      ...formValues
    }
    if(!validate.valid) return;
    try {
      let addListing = await axios.post('https://aftib-6o3h.onrender.com/listing/addListing',JSON.stringify(requestBody),{
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      })
      console.log({res: addListing.data})
        const formData = new FormData();
        let files = imageInput.current.files
        if(files.length > 0){
        // Create a FormData object
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
          }
        }
      // Make an Axios POST request to the add listing image endpoint
      const result = await axios.put(`https://aftib-6o3h.onrender.com/listing/addListingImages/${addListing.data.listingId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
          // Include any other headers you need, such as authorization
        }
      })
      console.log("Images uploaded successfully", result.data)
    }
    catch(err){
      console.error(err.message)
    }
  }

  function DraggableMarker() {
    const markerRef = useMapEvents({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log({newPosition: marker.getLatLng()})
        }
      }
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
          }
        }}
        position={position}
        ref={markerRef}
      />
    );
  }

  const handleSearch = () => {
    setPosition({ lat: 52.52, lng: 13.405 });
  }

  return (
    <div className="container mt-5">
      <div className="row">
      <div className="col-md-6 listing">
    <h2>Hotel</h2>
    <form onSubmit={handleSubmit} className="listing-container">
        <div className="form-group mb-3">
            <label className='mb-1'>Hotel Name</label>
            <input type="text" className="form-control" placeholder="e.g., Z hotel" name="name" id="name" value={formValues.name} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Description</label>
            <textarea className="form-control" placeholder="Detailed description of the hotel" rows="4" name="description" id="description" value={formValues.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Full Address</label>
            <input type="text" className="form-control" placeholder="e.g., 23A, Ikori Street, OJB road, Agege, Lagos." name="address" id="address" value={formValues.address} onChange={handleChange} />
        </div>
        <div className="form-group row mb-3">
            <div className="col-sm-6 mb-2">
                <label className='mb-1'>City</label>
                <input type="text" className="form-control" placeholder="City" name="city" id="city" value={formValues.location.city} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
                <label className='mb-1'>State</label>
                <input type="text" className="form-control" placeholder="State" name="state" id="state" value={formValues.location.state} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
                <label className='mb-1'>Country</label>
                <input type="text" className="form-control" placeholder="Country" name="country" id="country" value={formValues.location.country} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
                <label className='mb-1'>Zip Code</label>
                <input type="text" className="form-control" placeholder="Zip Code" name="zipCode" id="zipCode" value={formValues.location.zipCode} onChange={handleChange} />
            </div>
        </div>
        <div className="form-group row mb-3">
            <div className="col-sm-6 mb-2">
                <label className='mb-1'>Contact Phone</label>
                <input type="text" className="form-control" placeholder="Phone" name="phone" id="phone" value={formValues.contact.phone} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
                <label className='mb-1'>Contact Email</label>
                <input type="email" className="form-control" placeholder="Email" name="email" id="email" value={formValues.contact.email} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
                <label className='mb-1'>Website</label>
                <input type="url" className="form-control" placeholder="Website URL" name="website" id="website" value={formValues.contact.website} onChange={handleChange} />
            </div>
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Amenities</label>
            <input type="text" className="form-control" placeholder="e.g., Pool, Gym, Spa" name="amenities" id="amenities" value={formValues.amenities} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Rooms</label>
            <textarea className="form-control" placeholder="Room details in JSON format" rows="4" name="rooms" id="rooms" value={formValues.rooms} onChange={handleChange}></textarea>
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Images</label>
            <input type="text" className="form-control" placeholder="URLs to images separated by commas" name="images" id="images" value={formValues.images} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Ratings</label>
            <textarea className="form-control" placeholder="Ratings in JSON format" rows="4" name="ratings" id="ratings" value={formValues.ratings} onChange={handleChange}></textarea>
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Average Rating</label>
            <input type="number" className="form-control" placeholder="Average Rating" name="averageRating" id="averageRating" value={formValues.averageRating} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Policies</label>
            <textarea className="form-control" placeholder="Policies in JSON format" rows="4" name="policies" id="policies" value={formValues.policies} onChange={handleChange}></textarea>
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Nearby Attractions</label>
            <input type="text" className="form-control" placeholder="Nearby attractions separated by commas" name="nearbyAttractions" id="nearbyAttractions" value={formValues.nearbyAttractions} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
            <label className='mb-1'>Created By</label>
            <input type="text" className="form-control" placeholder="User ID" name="createdBy" id="createdBy" value={formValues.createdBy} onChange={handleChange} />
        </div>
    </form>
</div>

       
        <div className="col-md-6 local">
          <h2>Localization</h2>
          <div className="local-list">
          
          <div className="form-group row mb-3">
              <div className="col-sm-6 mb-3">
              <input type="text" className="form-control" placeholder="Localization" />
              </div>
              <div className="col-sm-6">
              <button className="btn localbtn " onClick={handleSearch}>Search</button>
              </div>
            </div>
            
           
           
            <p>Or drag the marker to property position</p>
           
            <div className="map-container mb-3">
              <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <DraggableMarker />
              </MapContainer>
            </div>
           
            <div className="form-group row">
              <div className="col-sm-6 mb-2">
                <input type="text" className="form-control" value={position.lat} readOnly placeholder="Latitude" />
              </div>
              <div className="col-sm-6">
                <input type="text" className="form-control" value={position.lng} readOnly placeholder="Longitude" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xs-12 gallery-listing mb-3">
          <div className="form-group mt-4">
            <h2>Gallery</h2>
            <div className="listing-gallery">
              <form id="uploadForm">
                  <input ref={imageInput} type="file" id="fileInput" name="files" multiple />
              </form>
              <div
                className="dropzone text-center"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('fileUpload').click()}
              >
                
                {images.length === 0 && (
                  <div className="placeholder-text">Drag & drop files here…</div>
                )}
               
                <div className="preview mt-3 d-flex flex-wrap justify-content-center">
                  {images.map((image, index) => (
                    <div key={index} className="p-2">
                      <img src={image} alt={`Upload Preview ${index}`} className="img-thumbnail" />
                     
                      <button className="btn btn-sm btn-danger btn-remove" onClick={() => removeImage(index)}>x</button>
                    </div>
                  ))}
                </div>
              </div>
           
              <div className="mt-3">
                <input
                  type="file"
                  id="fileUpload"
                  className="form-control custom-input-file"
                  onChange={handleFileSelect}
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
       
          </div>
      </div>
      <div className="row justify-content-center">
        <button className="btn listbtn  mt-3" onClick={submitForm}><Link to="/review" className='listbtn'>Submit </Link></button>
      </div>
    </div>
  );
};

export default Listing;