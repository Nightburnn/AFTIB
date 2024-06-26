import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Listing.css';
import L from 'leaflet';
import {nigerianStateData} from './data'
import { checkRequiredData } from '../../utils/processListing';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Listing = () => {
  let token = window.localStorage.getItem('accessToken')
  let imageInput = useRef(null)
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
      monthlyShortLetPrice: '',
      location: '',
      state: 'Abia',
      LGA: 'Aba North',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      virtualTour: '',
      neighborhood: '',
      propertyStatus: 'Available',
      energyRating: '',
      nearbySchools: '',
      transportation: '',
      floorNumber: '',
      agentName: '',
      agentPhone: '',
      agentEmail: ''
    });
    const [checks,setChecks] = useState({
      Garage: false,
      Garden: false,
      Balcony: false,
      'Pets Allowed': false,
      Furnished: false
    })
  

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
      let addListing = await axios.post('http://127.0.0.1:8080/listing/addListing',JSON.stringify(requestBody),{
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
      const result = await axios.put(`http://127.0.0.1:8080/listing/addListingImages/${addListing.data.listingId}`, formData, {
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
      <form onSubmit={handleSubmit} className="listing-container">
        
          <div className="form-group mb-3">
            <label className='mb-1'>Title</label>
            <input type="text" className="form-control" placeholder="eg, A luxury duplex in lekki." name="title" id="title" value={formValues.title} onChange={handleChange} />
          </div>
        <div className="form-group row mb-3">
          <div className=" col-sm-12 mb-3">
            <label className='mb-1'>Description: Add more details about the property</label>
            <textarea placeholder='Example: This luxury duplex in lekki sits on a 75 square kilometer land space, it has ...., it also features..... Add other details as necessary' className="form-control" rows="4" name="description" id="description" value={formValues.description} onChange={handleChange}></textarea>
          </div>
          <div className="col-sm-12">
          <label className='mb-1'>Is this property for sale, for rent or a shortlet?</label>
            <select className="form-control" name="saleType" id="saleType" value={formValues.saleType} onChange={handleChange}>
              <option>Select Option</option>
              <option>For Sale</option>
              <option>For Rent</option>
              <option>Short Let</option>
            </select>
          </div>
        </div>

        <div className="form-group row mb-3">
          <div className="col-sm-6 mb-2">
          <label className='mb-1'>What type of property is this? House, Land, Apartment...</label>
            <select className="form-control" name="propertyType" id="propertyType" value={formValues.propertyType} onChange={handleChange}>
              <option>Select Option</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Land</option>
              <option>Villa</option>
              <option>Duplex</option>
            </select>
          </div>
          <div className="col-sm-6">
          <label className='mb-1'>What is the size of this property in Square Meters (m<sup>2</sup>)</label>
            <input type="number" className="form-control" placeholder="70 (sqm)" name="size" id="size" value={formValues.size} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group row mb-3">
          <div className="col-sm-6 mb-2">
          <label className='mb-1'>How many bedrooms?</label>
            <select className="form-control" name="bedrooms" id="bedrooms" value={formValues.bedrooms} onChange={handleChange}>
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
          <label className='mb-1'>How many bathrooms?</label>
            <select className="form-control" name="bathrooms" id="bathrooms" value={formValues.bathrooms} onChange={handleChange}>
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
          <label className='mb-1'>Is this property in an estate? If yes, what is the name of the estate.(optional)</label>
            <input type="text" className="form-control" placeholder="Example: Peace Estate" name="estate" id="estate" value={formValues.estate} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group row mb-3">
          <div className="col-sm-6">
          <label className='mb-1'>What year was this property built? (Optional)</label>
            <input type="text" className="form-control" placeholder="Year built" name="yearBuilt" id="yearBuilt" value={formValues.yearBuilt} onChange={handleChange} />
          </div>
          <div className="col-sm-6">
          <label className='mb-1'>Property Availability</label>
            <select className="form-control" name="propertyStatus" id="propertyStatus" value={formValues.propertyStatus} onChange={handleChange}>
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
            {
              (formValues.saleType == 'For Sale' && (
                <div className="col-sm-12 mb-2">
                  <label className="col-form-label">How much is this property (Naira) </label>
                  <input type="number" className="form-control" placeholder="Price" name="price" id="price" value={formValues.price} onChange={handleChange} />
                </div>
              )) || (formValues.saleType == 'For Rent' && (
                <div className="col-sm-12">
                  <label className="col-form-label">Monthly Rent Price</label>
                  <input type="number" className="form-control" placeholder="Monthly Rent Payment" name="monthlyRentPayment" id="monthlyRentPayment" value={formValues.monthlyRentPayment} onChange={handleChange} />
                </div>)
              ) || (formValues.saleType == 'Short Let' && (
                <div className="col-sm-12">
                  <label className="col-form-label">Monthly Short Let Price</label>
                  <input type="number" className="form-control" placeholder="Monthly Short Let Price" name="monthlyShortLetPrice" id="monthlyShortLetPrice" value={formValues.monthlyShortLetPrice} onChange={handleChange} />
                </div>)
              )  
            }
          </div>
        </div>
        <div className="form-group mb-3">
          <div className="row">
            <div className="col-sm-12 mb-3">
              <label className="col-form-label">Full Address</label>
              <input type="text" className="form-control" placeholder="Example: 23A, Ikori Street, OJB road, Agege, Lagos." name="location" id="location" value={formValues.location} onChange={handleChange} />
            </div>
            <div className="col-sm-6 mb-2">
            <label className='mb-1'>Select State</label>
            <select className="form-control" name="state" id="state" value={formValues.state} onChange={handleChange}>
              {Object.keys(nigerianStateData).map(x=>{
                return (
                  <option>{x}</option>
                )
              })}
            </select>
            </div>
            <div className="col-sm-6 mb-2">
            <label className="mb-1">Local Government Area</label>
              <select className="form-control" name="LGA" id="LGA" value={formValues.LGA} onChange={handleChange}>
                {nigerianStateData[formValues.state].map(x=>{
                  return (
                    <option>{x}</option>
                  )
                })}
              </select>
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
          </div>
        </div>

        <div className="form-group mb-3">
          <label className="col-form-label">Agent's Contact</label>
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
          </div>
        </div>

        <div className="form-group mb-3">
          <h6 className="col-form-label">Additional Informations</h6>
          <div className="row">
            <div className="col-sm-12 mb-2">
            <label className="col-form-label">Add link for virtual tour (optional)</label>
              <input type="url" className="form-control" placeholder="Virtual Tour URL" name="virtualTour" id="virtualTour" value={formValues.virtualTour} onChange={handleChange} />
            </div>
            <div className="col-sm-12 mb-2">
            <label className="col-form-label">Neighborhood Details (optional)</label>
            <textarea style={{height: 110}} className="form-control" placeholder="Example: There is a mall about 1km from the property. The property is also close to the new lagos train..... Add more details as necessary." name="neighborhood" id="neighborhood" value={formValues.neighborhood} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>
              
        <div className="form-group mb-3">
          <div className="row">
            <div className="col-sm-12 mb-2">
            <label className="col-form-label">Add schools in the area? (optional)</label>
              <input type="text" className="form-control" placeholder="eg, Royal Kids School, Burkhart Academy... Add more separated by commas." name="nearbySchools" id="nearbySchools" value={formValues.nearbySchools} onChange={handleChange} />
            </div>
            <div className="col-sm-12 mb-2">
            <label className="col-form-label">Add transportation options in area? (optional)</label>
              <input type="text" className="form-control" placeholder="eg, Bus Terminal 2km away from property" name="transportation" id="transportation" value={formValues.transportation} onChange={handleChange} />
            </div>
            <div className="col-sm-12">
            <label className="col-form-label">What floor is the apartment. <br /> Note: Only answer if the property is an apartment for rent or short_let.(Optional)</label>
              <select className="form-control" name="floorNumber" id="floorNumber" value={formValues.floorNumber} onChange={handleChange} >
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
                  <input className="form-check-input" checked={checks[option]} onChange={()=> updateCheck(option)} type="checkbox" id={`checkbox${index}`} />
                  <label className="form-check-label" htmlFor={`checkbox${index}`}>{option}</label>
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
        <button className="btn listbtn  mt-3" onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
};

export default Listing;