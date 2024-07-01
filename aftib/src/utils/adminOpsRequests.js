import axios from "axios";
const localhostAddr = "http://127.0.0.1:8080";
const API_BASE_URL = "https://aftib-6o3h.onrender.com"; // adjust the base URL accordingly


let token = window.localStorage.getItem("accessToken");
// Initialize agent status request
export const requestAgencyStatus = async (data, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/request-agency-status`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Update passport photo
export const updateAgencyStatusPassport = async (formData, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/update-agency-status-passport`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Update issued ID photo
export const updateAgencyStatusIssuedId = async (formData, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/update-agency-status-issuedId`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Update the text fields of the agent status
export const updateAgencyStatus = async (data, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-agency-status`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// get pending agents request
export const fetchUnapprovedAgents = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/get-unapproved-agency-requests`,
    );
    console.log({ response });
    return response;
  } catch (error) {
    console.error("Error fetching requests:", error);
    // Handle error state or notify user
  }
};
// get pending agents request
export const fetchAapprovedAgents = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/get-approved-agency-requests`,
    );
    console.log({ response });
    return response;
  } catch (error) {
    console.error("Error fetching requests:", error);
    // Handle error state or notify user
  }
};

// search for agents
export const searchForAgents = async ({ state, lga, location }) => {
  let query = [];
  if (state) {
    query.push(`state=${state}`);
  }
  if (lga) {
    query.push(`LGA=${lga}`);
  }
  if (location) {
    query.push(`address=${location}`);
  }
  query = query.join("&");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/search-for-agent?${query}`,
    );
    console.log({ response });
    return response;
  } catch (error) {
    console.error("Error fetching requests:", error);
    // Handle error state or notify user
  }
};

// function to approve request.
export const approveRequest = async (requestId, token) => {
  // id of the item to be approved.
  try {
    const response = await axios.put(
      `${API_BASE_URL}/approve-agency-request/${requestId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
    // Optionally update state or notify user of success
  } catch (error) {
    console.error("Error approving request:", error);
    // Handle error state or notify user
  }
};

export const getAgencyRequestById = async (id) => {
  let url = `${API_BASE_URL}/get-agency-request/${id}`;
  try {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    console.error("Error fetching agency request:", error);
    throw error;
  }
};

export const getAgencyRequestByToken = async (id) => {
  let url = `${API_BASE_URL}/get-agency-request-by-token`;
  try {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    console.error("Error fetching agency request:", error);
    throw error;
  }
};

export const fetchUnapprovedListings = async () => {
  let url = `${API_BASE_URL}/listing/unApprovedListings`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching unapproved listings:", error);
    throw error;
  }
};

export const fetchListingById = async (id) => {
  let url = `${API_BASE_URL}/listing/getListingById/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
};

export const approveListing = async (id, token) => {
  let url = `${API_BASE_URL}/listing/approveListing/${id}`;

  try {
    const response = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error approving listing:", error);
    throw error;
  }
};

export const fetchUnapprovedHotels = async (page = 1) => {
  let url = `${API_BASE_URL}/hotels/unapproved/${page}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching unapproved hotels:", error);
    throw error;
  }
};
export const approveHotel = async (hotelId, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/hotels/approve/${hotelId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error approving hotel:", error);
    throw error;
  }
};

// Fetch hotel by ID
export const fetchHotelById = async (hotelId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotel by ID:", error);
    throw error;
  }
};

// fetch hotels approved
export const fetchApprovedHotels = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/getAll/${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};

// get user data. pass the accesstoken
export const getUserData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log({ response: response.data });
    return response.data;
  } catch (err) {
    throw err;
  }
};
