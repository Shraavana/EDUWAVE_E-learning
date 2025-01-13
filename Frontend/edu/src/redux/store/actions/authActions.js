import axios from 'axios';
import { 
  loginStart, loginSuccess, loginFailure,
  signupStart, signupSuccess, signupFailure,
  otpVerificationStart, otpVerificationSuccess, otpVerificationFailure
} from '../slices/authSilce';


export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}api/signup/`, 
      {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirm_password: userData.confirm_password
      }
    );
    
    dispatch(signupSuccess({...response.data, email: userData.email}));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Registration failed. Please try again.';           
    dispatch(signupFailure(errorMessage));
    throw error;
  }
};

export const verifyOTP = (email, otp) => async (dispatch) => {
  try {
    dispatch(otpVerificationStart());
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/verify-otp/`, {
      "email": email,
      "otp": otp
    });
    if (response.status === 200) {
    dispatch(otpVerificationSuccess(response.data));
    }
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        'OTP verification failed';
    dispatch(otpVerificationFailure(errorMessage));
    throw error;
  }
};



export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/login/`, credentials);
    dispatch(loginSuccess(response.data));
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    throw error;
  }
};