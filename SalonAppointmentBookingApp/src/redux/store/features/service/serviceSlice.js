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
        const result = state.filter(  // initial method
          item => item.serviceName !== action.payload.serviceName,
        );

        //  const result = state.filter(  // initial method
        //   item => item.id !== action.payload.id,
        // );
        state.splice(0, state.length, ...result);
      }
    },

    serviceDeleted(state, action) {
      const itemIdx = state.findIndex(item => item.id == action.payload.id);
      if (itemIdx !== -1) {
        state.splice(itemIdx, 1);
      }
    },

    deleteAllServices(state) {
      state.splice(0, state.length);
    }
  },
});

export const {serviceAdded, serviceDeleted, deleteAllServices} = serviceSlice.actions;

export default serviceSlice.reducer;
