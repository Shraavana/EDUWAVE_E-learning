import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  adminInfo: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
     
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.adminInfo = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.adminInfo = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    
  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
  clearError,
  
  
} = adminSlice.actions;

export default adminSlice.reducer;