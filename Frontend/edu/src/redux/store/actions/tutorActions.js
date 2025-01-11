import axios from 'axios';
import {
  tutorSignupStart,
  tutorSignupSuccess,
  tutorSignupFailure,
  fetchTutorsStart,
  fetchTutorsSuccess,
  fetchTutorsFailure,
  updateTutorStatusStart,
  updateTutorStatusSuccess,
  updateTutorStatusFailure
} from '../slices/tutorSlice';


// export const signupTutor = (tutorData) => async (dispatch) => {
//   try {
//     dispatch(tutorSignupStart());
//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}api/tutors/signup/`,
//       tutorData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     dispatch(tutorSignupSuccess(response.data));
//     return response.data; 
//   } catch (error) {

export const signupTutor = (tutorData) => async (dispatch) => {
  try {
    dispatch(tutorSignupStart());
    // Make sure there's no double slash in the URL
    const url = `${import.meta.env.VITE_BACKEND_URL}api/tutors/signup/`.replace(/([^:]\/)\/+/g, "$1");
    
    const response = await axios.post(
      url,
      tutorData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch(tutorSignupSuccess(response.data));
    return response.data; 
  } catch (error) {
    const errorMessage = error.response?.data?.error || 
                        error.message || 
                        'Tutor registration failed';
    dispatch(tutorSignupFailure(errorMessage));
    // Create a properly structured error object
    const enhancedError = new Error();
    enhancedError.response = {
      data: { message: errorMessage }
    };
    throw enhancedError;  // Throw the enhanced error
  }
};

// Fetch all tutors (admin)
export const fetchTutors = () => async (dispatch) => {
  try {
    dispatch(fetchTutorsStart());
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/tutors/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    dispatch(fetchTutorsSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchTutorsFailure(error.message));
    throw error;
  }
};

// Update tutor status (admin)
export const updateTutorStatus = (tutorId, status, comments) => async (dispatch) => {
  try {
    dispatch(updateTutorStatusStart());
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tutors/${tutorId}/`,
      { status, comments },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    dispatch(updateTutorStatusSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(updateTutorStatusFailure(error.message));
    throw error;
  }
};