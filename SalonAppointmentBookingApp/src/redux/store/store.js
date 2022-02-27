import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/service/serviceSlice';

export default configureStore({
  reducer: {
    service: serviceReducer,
  }
});