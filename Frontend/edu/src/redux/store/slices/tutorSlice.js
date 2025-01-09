import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tutor: null,
  loading: false,
  error: null,
  signupSuccess: false,
  tutors: [], // For admin view
  approvalStatus: null
};

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    tutorSignupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    tutorSignupSuccess: (state, action) => {
      state.loading = false;
      state.signupSuccess = true;
      state.tutor = action.payload;
      state.error = null;
    },
    tutorSignupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTutorsStart: (state) => {
      state.loading = true;
    },
    fetchTutorsSuccess: (state, action) => {
      state.loading = false;
      state.tutors = action.payload;
    },
    fetchTutorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTutorStatusStart: (state) => {
      state.loading = true;
    },
    updateTutorStatusSuccess: (state, action) => {
      state.loading = false;
      const updatedTutor = action.payload;
      state.tutors = state.tutors.map(tutor => 
        tutor.id === updatedTutor.id ? updatedTutor : tutor
      );
    },
    updateTutorStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetTutorState: (state) => {
      return initialState;
    }
  }
});

export const {
  tutorSignupStart,
  tutorSignupSuccess,
  tutorSignupFailure,
  fetchTutorsStart,
  fetchTutorsSuccess,
  fetchTutorsFailure,
  updateTutorStatusStart,
  updateTutorStatusSuccess,
  updateTutorStatusFailure,
  resetTutorState
} = tutorSlice.actions;

export default tutorSlice.reducer;