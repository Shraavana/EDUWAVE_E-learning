import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  adminInfo: null,
  profile: {
    data: null,
    loading: false,
    error: null
  },
  users: {
    list: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1
  }
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
    
   
    fetchUsersRequest: (state) => {
      state.users.loading = true;
      state.users.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.users.loading = false;
      state.users.list = action.payload.users;
      state.users.totalPages = action.payload.totalPages;
      state.users.currentPage = action.payload.currentPage;
    },
    fetchUsersFail: (state, action) => {
      state.users.loading = false;
      state.users.error = action.payload;
    },
    updateUserStatus: (state, action) => {
      const { userId, isActive } = action.payload;
      state.users.list = state.users.list.map(user =>
        user.id === userId ? { ...user, is_active: isActive } : user
      );
    },
    fetchProfileRequest: (state) => {
      state.profile.loading = true;
      state.profile.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.profile.loading = false;
      state.profile.data = action.payload;
      state.profile.error = null;
    },
    fetchProfileFail: (state, action) => {
      state.profile.loading = false;
      state.profile.error = action.payload;
    },

  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
  clearError,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFail,
  updateUserStatus,
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFail
  
} = adminSlice.actions;

export default adminSlice.reducer;