import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Listing.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Listing = () => {
 
  const [images, setImages] = useState([]);
  
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });
  const handleSubmit = (e) => {
    e.preventDefault();
  }

    const [formValues, setFormValues] = useState({
      title: '',
      description: '',
      saleType: '',
      propertyType: '',
      size: '',
      bedrooms: '',
      bathrooms: '',
      estate: '',
      yearBuilt: '',
      price: '',
      monthlyRentPayment: '',
      location: '',
      state: '',
      LGA: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      availableFrom: '',
      virtualTour: '',
      neighborhood: '',
      propertyStatus: '',
      energyRating: '',
      nearbySchools: '',
      transportation: '',
      floorNumber: '',
      agentName: '',
      agentPhone: '',
      agentEmail: ''
    });
  

  const checkboxes = [
    'Garage', 'Garden', 'Balcony',
    'Pets Allowed', 'Furnished', 'Option 6'
  ];


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
  };

  function DraggableMarker() {
    const markerRef = useMapEvents({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
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
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="row">
      <div className="col-md-6 listing">
      <h2>Listing</h2>
      <div className="listing-container">
        <div className="form-group row mb-3">
          <div className="col-sm-6 mb-2">
            <input type="text" className="form-control" placeholder="Title" name="title" id="title" value={formValues.title} onChange={handleChange} />
          </div>
          <div className="col-sm-6">
            <select className="form-control" name="saleType" id="saleType" value={formValues.saleType} onChange={handleChange}>
              <option>Sale Type</option>
              <option>Sale</option>
              <option>Rent</option>
            </select>
          </div>
        </div>

        <div className="form-group row mb-3">
          <div className="col-sm-6 mb-2">
            <select className="form-control" name="propertyType" id="propertyType" value={formValues.propertyType} onChange={handleChange}>
              <option>Property Type</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Land</option>
              <option>Villa</option>
              <option>Duplex</option>
            </select>
          </div>
          <div className="col-sm-6">
            <input type="text" className="form-control" placeholder="Size of (sqt)" name="size" id="size" value={formValues.size} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mb-3">
          <div className="col-sm-6 mb-2">
            <select className="form-control" name="bedrooms" id="bedrooms" value={formValues.bedrooms} onChange={handleChange}>
              <option>Bedroom</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="col-sm-6">
            <select className="form-control" name="bathrooms" id="bathrooms" value={formValues.bathrooms} onChange={handleChange}>
              <option>Bathroom</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </div>

        <div className="form-group row mb-3">
          <div className="col-sm-6 mb-2">
            <input type="text" className="form-control" placeholder="Estate" name="estate" id="estate" value={formValues.estate} onChange={handleChange} />
          </div>
          <div className="col-sm-6">
            <input type="text" className="form-control" placeholder="Year built" name="yearBuilt" id="yearBuilt" value={formValues.yearBuilt} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group mb-3">
          <label className="col-form-label">Price Range</label>
          <div className="row">
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="Price" name="price" id="price" value={formValues.price} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="Monthly Rent Payment" name="monthlyRentPayment" id="monthlyRentPayment" value={formValues.monthlyRentPayment} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <label className="col-form-label">Location</label>
          <div className="row">
            <div className="col-sm-12 mb-2">
              <input type="text" className="form-control" placeholder="Location" name="location" id="location" value={formValues.location} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="State" name="state" id="state" value={formValues.state} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="LGA" name="LGA" id="LGA" value={formValues.LGA} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <label className="col-form-label">Owner's Contact</label>
          <div className="row">
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="Name" name="ownerName" id="ownerName" value={formValues.ownerName} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="Phone" name="ownerPhone" id="ownerPhone" value={formValues.ownerPhone} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="Email" name="ownerEmail" id="ownerEmail" value={formValues.ownerEmail} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="Available From" name="availableFrom" id="availableFrom" value={formValues.availableFrom} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <label className="col-form-label">Others</label>
          <div className="row">
            <div className="col-sm-12 mb-2">
              <input type="url" className="form-control" placeholder="Virtual Tour URL" name="virtualTour" id="virtualTour" value={formValues.virtualTour} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="Neighborhood" name="neighborhood" id="neighborhood" value={formValues.neighborhood} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="Property Status" name="propertyStatus" id="propertyStatus" value={formValues.propertyStatus} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <div className="row">
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="Energy Rating" name="energyRating" id="energyRating" value={formValues.energyRating} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="Nearby Schools" name="nearbySchools" id="nearbySchools" value={formValues.nearbySchools} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="Transportation" name="transportation" id="transportation" value={formValues.transportation} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="Floor Number" name="floorNumber" id="floorNumber" value={formValues.floorNumber} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <label className="col-form-label">Admin's Contact</label>
          <div className="row">
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="Name" name="agentName" id="agentName" value={formValues.agentName} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="Phone" name="agentPhone" id="agentPhone" value={formValues.agentPhone} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
              <input type="text" className="form-control" placeholder="Email" name="agentEmail" id="agentEmail" value={formValues.agentEmail} onChange={handleChange} />
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" placeholder="Available From" name="agentAvailableFrom" id="agentAvailableFrom" value={formValues.agentAvailableFrom} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Description</label>
          <textarea className="form-control" rows="4" name="description" id="description" value={formValues.description} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <div className="row">
            {checkboxes.map((option, index) => (
              <div className="col-6 col-sm-4 mb-2" key={index}>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id={`checkbox${index}`} />
                  <label className="form-check-label" htmlFor={`checkbox${index}`}>{option}</label>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
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
        
        <button className="btn listbtn  mt-3"><Link to="/review" className='text-white'>Submit</Link></button>
        
       
      </div>
    </form>
  );
};

export default Listing;