import axios from 'axios';

export async function sendVerifyOtp(email, otp) {
  try {
    const response = await axios.get(`http://localhost:8080/verify-otp/${email}/${otp}`);
    console.log('OTP verified:', response.data);
    return response.data; // You can return this data to use in the calling function
  } catch (error) {
    console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
    throw error; // Throw error to handle it in the calling function
  }
}


export async function sendForgotPasswordForEmail({email}) {
  try {
    const response = await axios.get(`http://localhost:8080/send-forgotpassword-otp/${email}`);
    console.log('Email sent:', response.data);
    return response.data; // You can return this data to use in the calling function
  } catch (error) {
    console.error('Error sending OTP:', error.response ? error.response.data : error.message);
    throw error; // Throw error to handle it in the calling function
  }
}

