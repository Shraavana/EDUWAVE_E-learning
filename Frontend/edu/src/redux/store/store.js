import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSilce';
import tutorReducer from './slices/tutorSlice';
import adminReducer from './slices/adminSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    tutor:tutorReducer,
    admin: adminReducer,
  }
});