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
    <div>
      <div>
        <div>
          <input
            type="radio"
            value="suite"
            name={`roomType-${room.id}`}
            checked={room.type === 'suite'}
            onChange={onChange('type')}
          />
          <label>Suite</label><br />
          <input
            type="radio"
            value="double"
            name={`roomType-${room.id}`}
            checked={room.type === 'double'}
            onChange={onChange('type')}
          />
          <label>Double Room</label><br />
          <input
            type="radio"
            value="single"
            name={`roomType-${room.id}`}
            checked={room.type === 'single'}
            onChange={onChange('type')}
          />
          <label>Single Room</label><br />
        </div>
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={room.description}
          onChange={onChange('description')}
        />
      </div>
      <div>
        <label>Price Per Night</label>
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={room.price}
          onChange={onChange('price')}
        />
      </div>
      <div>
        <label>Amenities</label>
          <input id='amenity' type="text" name="amenity" placeholder="Add Amenity" />
          <button onClick={handleAmenityAdd}>Add</button>
        <div>
          {amenities.map((amenity, index) => (
            <span key={index}>
              {amenity} <button onClick={() => handleAmenityDelete(index)}>x</button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label>Upload Room Images</label>
        <input
          type="file"
          multiple
          ref={imageInput}
          onChange={handleImageUpload}
        />
        <div className="row">
          {previews.map((src, index) => (
            <div className="col-3" key={index}>
              <img src={src} alt={`Room ${index}`} style={{ width: '100%' }} />
              <button onClick={() => handleImageDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Maximum Occupants</label>
        <input
          type="number"
          className="form-control"
          placeholder="Maximum Occupants"
          value={room.maxOccupants}
          onChange={onChange('maxOccupants')}
        />
      </div>
      <div>
        <label>How many of this room do you have in your hotel?</label>
        <input
          type="number"
          className="form-control"
          placeholder="Number of Rooms"
          value={room.roomCount}
          onChange={onChange('roomCount')}
        />
      </div>
      <button onClick={onDelete}>Delete Room</button>
    </div>
  );
};
