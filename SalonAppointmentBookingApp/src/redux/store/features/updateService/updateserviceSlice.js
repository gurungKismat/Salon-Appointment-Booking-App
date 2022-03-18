import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const serviceUpdateSlice = createSlice({
  name: 'Service',
  initialState: initialState,
  reducers: {
    updateService(state, action) {
      if (state.length !== 0) {
        state.splice(0, state.length);
      }
      state.push(action.payload);
    },
  },
});

export const {updateService} = serviceUpdateSlice.actions;

export default serviceUpdateSlice.reducer;
