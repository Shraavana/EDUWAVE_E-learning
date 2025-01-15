import axios from 'axios';
import { loginRequest, loginSuccess, loginFail} from '../slices/adminSlice';


export const adminLogin = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    
    const config = {
      headers: { 
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/login/`,
      credentials,
      config
    );

    if (data && data.tokens) {
      // Store tokens
      localStorage.setItem('adminToken', data.tokens.access);
      localStorage.setItem('adminRefreshToken', data.tokens.refresh);
      
      // Update state
      dispatch(loginSuccess({
        message: data.message,
        tokens: data.tokens
      }));
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    const errorMessage = 
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Login failed. Please try again.';
      
    dispatch(loginFail(errorMessage));
  }
};





