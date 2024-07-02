import React, { useState, useRef } from 'react';
export const RoomForm = ({ room, onChange, onDelete, updateRoomImages, updateAmenities }) => {
    const [images, setImages] = useState(room.images || []);
    const [previews, setPreviews] = useState(room.images || []);
    const [amenities, setAmenities] = useState(room.amenities || []);
    const imageInput = useRef(null);
  
    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => URL.createObjectURL(file));
      setImages([...images, ...files]);
      setPreviews([...previews, ...newImages]);
      imageInput.current.value = null;
      updateRoomImages(room.id, [...images, ...files]);
    };
  
    const handleImageDelete = (index) => {
      const newImages = images.filter((_, i) => i !== index);
      const newPreviews = previews.filter((_, i) => i !== index);
      setImages(newImages);
      setPreviews(newPreviews);
      updateRoomImages(room.id, newImages);
    };
  
  
    const handleAmenityDelete = (index) => {
      const newAmenities = amenities.filter((_, i) => i !== index);
      setAmenities(newAmenities);
      updateAmenities(room.id, newAmenities);
    };
  

  const handleAmenityAdd = (e) => {
    const amenity = document.getElementById('amenity')
    if (amenity) {
        console.log(amenity)
      setAmenities([...amenities, amenity.value]);
      updateAmenities(room.id, [...amenities, amenity]);
      amenity.value = ''
    }
  };


  return (
    <div className="">
    <div className="form-group mb-3">
      <label className="form-label mb-1">Room Type</label>
      <div className="form-check-inline">
        <input
          type="radio"
          value="suite"
          name={`roomType-${room.id}`}
          checked={room.type === 'suite'}
          onChange={onChange('type')}
          className="form-check-input"
        />
        <label className="form-check-label">Suite</label>
      </div>
      <div className="form-check-inline">
        <input
          type="radio"
          value="double"
          name={`roomType-${room.id}`}
          checked={room.type === 'double'}
          onChange={onChange('type')}
          className="form-check-input"
        />
        <label className="form-check-label">Double Room</label>
      </div>
      <div className="form-check-inline">
        <input
          type="radio"
          value="single"
          name={`roomType-${room.id}`}
          checked={room.type === 'single'}
          onChange={onChange('type')}
          className="form-check-input"
        />
        <label className="form-check-label">Single Room</label>
      </div>
    </div>
  
    <div className="form-group mb-3">
      <label className="form-label mb-1">Description</label>
      <input
        type="text"
        className="form-control"
        placeholder="Description"
        value={room.description}
        onChange={onChange('description')}
      />
    </div>
  
    <div className="form-group mb-3">
      <label className="form-label mb-1">Price Per Night</label>
      <input
        type="number"
        className="form-control"
        placeholder="Price"
        value={room.price}
        onChange={onChange('price')}
      />
    </div>
  
    <div className="form-group mb-3">
      <label className="form-label mb-1">Amenities</label>
      <div className="input-group">
        <input
          id="amenity"
          type="text"
          name="amenity"
          placeholder="Add Amenity"
          className="form-control"
        />
        <button onClick={handleAmenityAdd} className="btn blue">
          Add
        </button>
      </div>
      <div className="amenities-list">
        {amenities.map((amenity, index) => (
          <span key={index} className="badge bg-secondary me-2">
            {amenity}
            <button
              onClick={() => handleAmenityDelete(index)}
              className="btn-close ms-1"
            ></button>
          </span>
        ))}
      </div>
    </div>
  
    <div className="form-group mb-3">
      <label className="form-label mb-1">Upload Room Images</label>
      <div className="input-group">
          <input
        type="file"
        multiple
        ref={imageInput}
        onChange={handleImageUpload}
        className="form-control-file"
      />
      <div className="row mt-3">
        {previews.map((src, index) => (
          <div className="col-3" key={index}>
            <img src={src} alt={`Room ${index}`} className="img-thumbnail" />
            <button
              onClick={() => handleImageDelete(index)}
              className="btn danger btn-sm mt-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      </div>
    
    </div>
  
    <div className="form-group mb-3">
      <label className="form-label mb-1">Maximum Occupants</label>
      <input
        type="number"
        className="form-control"
        placeholder="Maximum Occupants"
        value={room.maxOccupants}
        onChange={onChange('maxOccupants')}
      />
    </div>
  
    <div className="form-group mb-3">
      <label className="form-label mb-1">Number of This Room</label>
      <input
        type="number"
        className="form-control"
        placeholder="Number of Rooms"
        value={room.roomCount}
        onChange={onChange('roomCount')}
      />
    </div>
  
    <div className="d-grid">
      <button onClick={onDelete} className="btn danger mb-4">
        Delete Room
      </button>
    </div>
  </div>
  
  );
};
