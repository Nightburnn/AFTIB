import React, { useState, useRef } from "react";

export const RoomForm = ({
  room,
  onChange,
  onDelete,
  updateRoomImages,
  updateAmenities,
}) => {
  const [images, setImages] = useState(room.images.filter(x=>x) || []);
  const [previews, setPreviews] = useState(room.images.filter(x=>x) || []);
  const [amenities, setAmenities] = useState(room.amenities || []);
  const imageInput = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...files]);
    setPreviews([...previews, ...newImages]);
    imageInput.current.value = null;
    updateRoomImages(room.roomId, [...images, ...files]);
  };

  const handleImageDelete = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
    updateRoomImages(room.roomId, newImages);
  };

  const handleAmenityAdd = (e) => {
    const amenity = document.getElementById("amenity");
    if (amenity) {
      console.log(amenity);
      setAmenities([...amenities, amenity.value]);
      updateAmenities(room.roomId, [...amenities, amenity]);
      amenity.value = "";
    }
  };

  const handleAmenityDelete = (index) => {
    const newAmenities = amenities.filter((_, i) => i !== index);
    updateAmenities(room.roomId, newAmenities);
    setAmenities(newAmenities);
  };

  return (
    <div className="">
      <div className="form-group mb-3">
        <p className="form-label mb-1">Room Type</p>
        <div className="form-check-inline">
          <input
            type="radio"
            value="suite"
            name={`roomType-${room.roomId}`}
            checked={room.roomType === "suite"}
            onChange={onChange("roomType")}
            className="form-check-input"
          />
          <label className="form-check-label">Suite</label>
        </div>
        <div className="form-check-inline">
          <input
            type="radio"
            value="double"
            name={`roomType-${room.roomId}`}
            checked={room.roomType === "double"}
            onChange={onChange("roomType")}
            className="form-check-input"
          />
          <label className="form-check-label">Double Room</label>
        </div>
        <div className="form-check-inline">
          <input
            type="radio"
            value="single"
            name={`roomType-${room.roomId}`}
            checked={room.roomType === "single"}
            onChange={onChange("roomType")}
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
          onChange={onChange("description")}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label mb-1">Price Per Night</label>
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={room.price}
          onChange={onChange("price")}
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
            <span key={index} className="badge bg-primary my-1 me-2 p-2">
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
                <img
                  src={src}
                  alt={`Room ${index}`}
                  className="img-thumbnail"
                />
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
          onChange={onChange("maxOccupants")}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label mb-1">
          How many of this rooms do you have in your hotel?
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Number of Rooms"
          value={room.roomCount}
          onChange={onChange("roomCount")}
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
