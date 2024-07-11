import axios from "axios";
let localhostAddr = "http://127.0.0.1:8080";
let API_BASE_URL = "https://aftib-6o3h.onrender.com";
//API_BASE_URL = localhostAddr
let token = window.localStorage.getItem("accessToken");
// Initialize agent status request 
export const requestAgencyStatus = async (data) => {
  let token = window.localStorage.getItem("accessToken");
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
}

// Update passport photo
export const updateAgencyStatusPassport = async (formData) => {
  let token = window.localStorage.getItem("accessToken");
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
export const updateAgencyStatusIssuedId = async (formData) => {
  let token = window.localStorage.getItem("accessToken");
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
export const updateAgencyStatus = async (data) => {
  let token = window.localStorage.getItem("accessToken");
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
export const searchForAgents = async ({ location }) => {
  let query = [];
  if (location) {
    query.push(`address=${location}`);
  }
  query = query.join("&");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/search-for-agent?location=${location}`,
    );
    console.log({ response });
    return response;
  } catch (error) {
    console.error("Error fetching requests:", error);
    // Handle error state or notify user
  }
};

// function to approve request.
export const approveRequest = async (requestId) => {
  let token = window.localStorage.getItem("accessToken");
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

// function to approve request.
export const rejectRequest = async (requestId, message) => {
  let token = window.localStorage.getItem("accessToken");
  // id of the item to be approved.
  try {
    const response = await axios.put(
      `${API_BASE_URL}/reject-agency-request/${requestId}?message=${message}`,
      { message },
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
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching agency request:", error);
    throw error;
  }
};

export const getAgencyRequestByToken = async (id) => {
  let url = `${API_BASE_URL}/get-agency-request-by-token`;
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
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

export const removeListingImages = async (listingId, toBeRemoved) => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${listingId}`,
      { toBeRemoved },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you store token in localStorage
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error removing images:", error);
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

export const approveListing = async (id) => {
  let url = `${API_BASE_URL}/listing/approveListing/${id}`;
  let token = window.localStorage.getItem("accessToken");

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
export const approveHotel = async (hotelId) => {
  let token = window.localStorage.getItem("accessToken");
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
export const rejectHotel = async (hotelId, message) => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.put(
      `${API_BASE_URL}//hotels/reject/${hotelId}?message=${message}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting hotel:", error);
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
  let token = window.localStorage.getItem("accessToken");
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

// get user data. pass the accesstoken
export const getAgentDashboardData = async () => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/get-agent-dashboard-data`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log({ response: response.data });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// get user data. pass the accesstoken
export const getAdminDashboardData = async () => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/get-admin-dashboard-data`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log({ response: response.data });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const sendContactForm = async (name, email, message) => {
  let token = window.localStorage.getItem("accessToken");
  try {
    // Create the payload
    const payload = {
      name,
      email,
      message,
    };

    // Send the POST request to the server
    const response = await axios.post(
      `${API_BASE_URL}/send-contact-form`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending contact form:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const updateUser = async (userData) => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.put(
      `${API_BASE_URL}/auth/update-user`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('User updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export const checkSession = async () => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/check-session`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Session is valid:', response.status);
    return response.status === 200;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Session expired or unauthorized:', error.response.data);
      return false;
    } else {
      console.error('Error checking session:', error.message);
      throw error;
    }
  }
};

export const getClientAccounts = async (page) => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/getClientAccounts/${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Client accounts retrieved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('There was an error retrieving client accounts:', error.message);
    throw error;
  }
};

export const getUserById = async (id) => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/get-user-by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const getClientCount = async () => {
  let token = window.localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/client-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.count;
  } catch (error) {
    console.error('Error fetching client count:', error);
    throw error;
  }
};