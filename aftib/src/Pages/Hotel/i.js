const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);
  const newImages = files.map((file) => URL.createObjectURL(file));
  setImages([...images, ...files]);
  setPreviews([...previews, ...newImages]);
  imageInput.current.value = null;
};

const handleImageDelete = (index) => {
  const newImages = images.filter((_, i) => i !== index);
  const newPreviews = previews.filter((_, i) => i !== index);
  setImages(newImages);
  setPreviews(newPreviews);
};

const handleAmenityAdd = (e) => {
  const amenity = document.getElementById("amenity");
  if (amenity) {
    console.log(amenity);
    setAmenities([...amenities, amenity.value]);
    amenity.value = "";
  }
};

const handleAmenityDelete = (index) => {
  const newAmenities = amenities.filter((_, i) => i !== index);
  setAmenities(newAmenities);
};
