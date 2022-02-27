import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    // add services in the cart
    serviceAdded(state, action) {
      if (action.payload.isSelected) {
        state.push(action.payload);
      } else {
        const result = state.filter(
          item => item.serviceName !== action.payload.serviceName,
        );
        state.splice(0, state.length, ...result);
      }
    },
  },
});

export const {serviceAdded} = serviceSlice.actions;

export default serviceSlice.reducer;
