import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Listing.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Listing = () => {
 
  const [images, setImages] = useState([]);
  
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  const checkboxes = [
    'Option 1', 'Option 2', 'Option 3',
    'Option 4', 'Option 5', 'Option 6',
    'Option 7', 'Option 8', 'Option 9'
  ];

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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 listing">
          <h2>Listing</h2>
          <div className="listing-container">
            <div className="form-group row mb-3">
              <div className="col-sm-6 mb-2">
                <select className="form-control">
                  <option>Property Type</option>
                  <option>Type 1</option>
                  <option>Type 2</option>
                  <option>Type 3</option>
                </select>
              </div>
              <div className="col-sm-6">
                <input type="text" className="form-control" placeholder="Sqt" />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-sm-6 mb-2">
                <select className="form-control">
                  <option>Bedroom</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className="col-sm-6">
                <select className="form-control">
                  <option>Bathroom</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>
    
            <div className="form-group mb-3">
              <label className="col-form-label">Price Range</label>
              <div className="row">
                <div className="col-sm-6 mb-2">
                  <input type="text" className="form-control" placeholder="Min" />
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control" placeholder="Max" />
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="col-form-label">Location</label>
              <div className="row">
                <div className="col-sm-12 mb-2">
                  <input type="text" className="form-control" placeholder="Location" />
                </div>
                
              </div>
            </div>
           
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea className="form-control" rows="4"></textarea>
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
        <button className="btn listbtn  mt-3">Submit</button>
      </div>
    </div>
  );
};

export default Listing;