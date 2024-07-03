import axios from "axios";
let localhostAddr = "http://127.0.0.1:8080";
let API_BASE_URL = "https://aftib-6o3h.onrender.com"; // adjust the base URL accordingly
API_BASE_URL = localhostAddr;

let token = window.localStorage.getItem("accessToken");

export async function beginPayment(transactionId) {
  let token = window.localStorage.getItem("accessToken");
  console.log("Beginning Payment with transaction ID:", transactionId,token);

  try {
    const response = await axios.post(`${API_BASE_URL}/transactions/initialize-payment`, JSON.stringify({ transactionId }), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Payment data retrieved successfully", response.data);

    function onSuccess() {
      console.log({ success: true });
      confirmPayment(transactionId); // Pass transactionId to confirmPayment
    }

    function onError() {
      console.error({ error: true });
    }

    function onClose() {
      console.log({ closed: true });
    }

    let newPayment = window.RmPaymentEngine.init({ ...response.data, onSuccess, onError, onClose });
    newPayment.showPaymentWidget();
  } catch (error) {
    console.error("There was an error retrieving payment data", error);
    throw error; // Optionally re-throw the error to handle it further up the call stack
  }
}


export async function createTransaction(propertyId, transactionType,rentDetails={}) {
  console.log('Creating transaction with propertyId:', propertyId, 'and transactionType:', transactionType,token);

  try {
    let initData = {
      propertyId,
      transactionType,
      rentDetails
    };

    const response = await axios.post(`${API_BASE_URL}/transactions/create-transaction`, JSON.stringify(initData), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Transaction created successfully", response.data);
    return response.data; // Return data if needed
  } catch (error) {
    console.error("There was an error creating the transaction", error);
    throw error; // Optionally re-throw the error to handle it further up the call stack
  }
}



export async function confirmPayment(transactionId) {
  console.log('Beginning confirmation for transaction ID:', transactionId);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/transactions/check-rrr-payment-status`, JSON.stringify({ transactionId }), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Payment confirmation successful", response.data);
  } catch (error) {
    console.error("There was an error retrieving payment data", error);
    throw error; // Optionally re-throw the error to handle it further up the call stack
  }
}

export const fetchTransactionById = async (transactionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the transaction by ID", error);
    throw error;
  }
};

export const fetchTransactions = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching transactions", error);
    throw error;
  }
};