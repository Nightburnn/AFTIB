import axios from "axios";

export async function sendVerifyOtp(email, otp) {
  try {
    const response = await axios.get(
      `https://aftib-6o3h.onrender.com/auth/verify-otp/${email}/${otp}`,
    );
    console.log("OTP verified:", response.data);
    return response.data; // You can return this data to use in the calling function
  } catch (error) {
    console.error(
      "Error verifying OTP:",
      error.response ? error.response.data : error.message,
    );
    throw error; // Throw error to handle it in the calling function
  }
}

export async function sendForgotPasswordForEmail(email) {
  try {
    let url = `https://aftib-6o3h.onrender.com/auth/send-forgotpassword-otp/${email}`;
    console.log({ url });
    const response = await axios.get(url);
    console.log("Email sent:", response.data);
    return response.data; // You can return this data to use in the calling function
  } catch (error) {
    console.error(
      "Error sending OTP:",
      error.response ? error.response.data : error.message,
    );
    throw error; // Throw error to handle it in the calling function
  }
}

export async function changePassword(email, newPassword) {
  const url = `https://aftib-6o3h.onrender.com/auth/change-password/${email}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = {
    newPassword,
  };

  try {
    const response = await axios.post(url, data, config);
    console.log("Password changed successfully:", response);
    return response;
  } catch (error) {
    console.error("Error changing password:", error.response.data);
    throw error;
  }
}
