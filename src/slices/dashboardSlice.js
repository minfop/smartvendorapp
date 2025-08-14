import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeDashboardTab: 'signals',
};

const dashboardSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveDashboardTab: (state, action) => {
      state.activeDashboardTab = action.payload;
    },
  },
});

export const { setActiveDashboardTab } = dashboardSlice.actions;
export default dashboardSlice.reducer; 