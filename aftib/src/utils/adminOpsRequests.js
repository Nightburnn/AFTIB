import axios from "axios";

const API_BASE_URL = "https://aftib-6o3h.onrender.com"; // adjust the base URL accordingly

// Initialize agent status request
export const requestAgencyStatus = async (data, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/request-agency-status`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Update passport photo
export const updateAgencyStatusPassport = async (formData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update-agency-status-passport`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Update issued ID photo
export const updateAgencyStatusIssuedId = async (formData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update-agency-status-issuedId`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Update the text fields of the agent status
export const updateAgencyStatus = async (data, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-agency-status`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// get pending agents request
export const fetchRequests = async (page = 1) => {
  try {
    const response = await axios.get(API_BASE_URL+"/api/admin-ops/agency-requests/"+page);
    console.log({response})
    return response
  } catch (error) {
    console.error("Error fetching requests:", error);
    // Handle error state or notify user
  }
};
// function to approve request.
export const approveRequest = async (requestId,token) => {
  // id of the item to be approved.
  try {
    const response = await axios.put(`${API_BASE_URL}/api/admin-ops/approve-agency-request/${requestId}`,{},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response
    // Optionally update state or notify user of success
  } catch (error) {
    console.error("Error approving request:", error)
    // Handle error state or notify user
  }
};

export const getAgencyRequestById = async (id, token) => {
  try {
    const response = await axios.get(`/admin-ops/get-agency-request/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching agency request:', error);
    throw error;
  }
};






