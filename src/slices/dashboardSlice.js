import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeDashboardTab: 0,
  showModal: false,
  form: {
    customerName: '',
    jobName: '',
    notes: '',
    deliveryDate: '',
    priceQuote: 1000,
    jobStatus: 'S',
    jobId: 0
  },
  editMode: false,
  jobDetails: []
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveDashboardTab(state, action) {
      state.activeDashboardTab = action.payload;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setForm(state, action) {
      state.form = action.payload;
    },
    setEditMode(state, action) {
      state.editMode = action.payload;
    },
    setJobDetails(state, action) {
      state.jobDetails = action.payload;
    }
  }
});

export const { setActiveDashboardTab, setShowModal, setForm, setEditMode, setJobDetails } = dashboardSlice.actions;
export default dashboardSlice.reducer;