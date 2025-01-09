import axios from 'axios';
import { loginRequest, loginSuccess, loginFail,fetchUsersFail,fetchProfileFail,fetchProfileSuccess,fetchProfileRequest} from '../slices/adminSlice';
import adminAxios from '../../../utils/adminAxios';



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





export const fetchUsers = (page = 1, search = '') => async (dispatch) => {
  try {
    dispatch(fetchUsersRequest());

    const response = await adminAxios.get(`/admin/users/?page=${page}&search=${search}`);
    
    dispatch(fetchUsersSuccess({
      users: response.data.users,
      totalPages: response.data.total_pages,
      currentPage: response.data.current_page
    }));
  } catch (error) {
    const errorMessage = 
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Failed to fetch users';
    
    dispatch(fetchUsersFail(errorMessage));
  }
};

export const toggleUserBlock = (userId, currentStatus) => async (dispatch) => {
  try {
    const action = currentStatus ? 'block' : 'unblock';
    await adminAxios.patch(`/admin/users/${userId}/`, { action });
    
    dispatch(updateUserStatus({
      userId,
      isActive: !currentStatus
    }));
    
    return true;
  } catch (error) {
    const errorMessage = 
      error.response?.data?.error ||
      error.response?.data?.message ||
      `Failed to ${currentStatus ? 'block' : 'unblock'} user`;
    
    // You might want to show this error in the UI
    console.error(errorMessage);
    return false;
  }
};



export const fetchAdminProfile = () => async (dispatch) => {
  try {
    dispatch(fetchProfileRequest());
    const response = await adminAxios.get('/admin/profile/');
    
    dispatch(fetchProfileSuccess(response.data));
  } catch (error) {
    const errorMessage = 
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Failed to fetch profile';
    
    dispatch(fetchProfileFail(errorMessage));
  }
};