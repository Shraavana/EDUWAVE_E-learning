import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
  tempEmail : null ,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.otpSent = true;
      state.error = null;
      state.tempEmail = action.payload.email;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerificationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.otpVerified = true;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.tempEmail = null ; 
    },
    otpVerificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      return initialState;
    }
  }
});

export const {
  loginStart, loginSuccess, loginFailure,
  signupStart, signupSuccess, signupFailure,
  otpVerificationStart, otpVerificationSuccess, otpVerificationFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;