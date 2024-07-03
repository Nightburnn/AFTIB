import axios from "axios";

export function validateRequiredHotelData(params) {
  let requiredData = [
    "name",
    "description",
    "address",
    "LGA",
    "state",
    "phone",
    "email",
    "website",
  ];
  let valid = { valid: true };
  for (let each of requiredData) {
    if (params[each] == "") {
      return { valid: false, error: `Please input a valid ${each} to proceed` };
    }
  }
  return valid;
}
export function generateAddHotelReqBody({ formValues, amenities }) {
  let amenitiesReformed = {};
  amenities.forEach((x) => {
    let name = Object.keys(x)[0];
    amenitiesReformed[name] = x[name];
  });
  let flat = { ...formValues, amenities: amenitiesReformed };
  return {
    ...formValues,
    amenities,
    contact: {
      phone: formValues.phone,
      email: formValues.email,
      website: formValues.website,
    },
    locationData: {
      LGA: formValues.LGA,
      state: formValues.state,
    },
  };
}
export async function addNewHotel(reqBody, token) {
  try {
    let url = `http://127.0.0.1:8080/hotels`;
    let response = await axios.post(url, reqBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.error(err.message);
  }
}
