import axios from 'axios';
import {
  tutorSignupStart,
  tutorSignupSuccess,
  tutorSignupFailure,
} from '../slices/tutorSlice';



export const signupTutor = (tutorData) => async (dispatch) => {
  try {
    dispatch(tutorSignupStart());
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/tutors/signup/`.replace(/([^:]\/)\/+/g, "$1");
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
    const enhancedError = new Error();
    enhancedError.response = {
      data: { message: errorMessage }
    };
    throw enhancedError; 
  }
};

