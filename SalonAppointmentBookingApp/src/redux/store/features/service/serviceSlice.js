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

    serviceDeleted(state, action) {
      const itemIdx = state.findIndex(item => item.id == action.payload.id);
      if (itemIdx !== -1) {
        state.splice(itemIdx, 1);
      }
    },
  },
});

export const {serviceAdded, serviceDeleted} = serviceSlice.actions;

export default serviceSlice.reducer;
