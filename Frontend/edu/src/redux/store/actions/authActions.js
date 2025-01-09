import axios from 'axios';
import { 
  loginStart, loginSuccess, loginFailure,
  signupStart, signupSuccess, signupFailure,
  otpVerificationStart, otpVerificationSuccess, otpVerificationFailure
} from '../slices/authSilce';



export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup/`, userData);
    dispatch(signupSuccess({...response.data,email:userData.email}));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                'Registration failed. Please try again.';           
    dispatch(signupFailure(errorMessage));
    throw error;
  }
};


export const verifyOTP = (email, otp) => async (dispatch, getState) => {
  try {
    dispatch(otpVerificationStart());
    // If email is not provided, get it from the state
    const stateEmail = email || getState().auth.tempEmail;
    if (!stateEmail) {
      throw new Error('Email not found');
    }
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-otp/`, {
      email: stateEmail,
      otp
    });
    dispatch(otpVerificationSuccess(response.data));
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    dispatch(otpVerificationFailure(error.response?.data?.message || 'OTP verification failed'));
    throw error;
  }
};



export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post('/api/login/', credentials);
    dispatch(loginSuccess(response.data));
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    throw error;
  }
};