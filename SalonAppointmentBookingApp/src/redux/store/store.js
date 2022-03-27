import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/service/serviceSlice';
import updateserviceSlice from './features/updateService/updateserviceSlice';

export default configureStore({
  reducer: {
    service: serviceReducer,
    updateService: updateserviceSlice,
  }
});