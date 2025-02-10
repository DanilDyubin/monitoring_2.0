import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
  byImage: [],
  total: {},
  groupsReport: [],
  itemsReport: [],
  groupsReportByImage: [],
  index: 0,
  loadingPage: false,
  loadingImages: false,
  arrayFilesLength: 0,
};

// try {
//   const exist = sessionStorage.getItem('report');
//   if (exist) {
//     const parsed = JSON.parse(exist);
//     // Сливаем то, что в parsed, с initialState
//     Object.assign(initialState, parsed);
//   }
// } catch (e) {
//   console.error('Ошибка при чтении sessionStorage:', e);
// }

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
    setReportData(state, action) {
      const { byImage = [], total = {} } = action.payload || {};
      state.byImage = byImage;
      state.total = total;
    },
    setReportGroups(state, action) {
      state.groupsReport = action.payload || [];
    },
    setReportItems(state, action) {
      state.itemsReport = action.payload || [];
    },
    setReportGroupsByImage(state, action) {
      state.groupsReportByImage = action.payload || [];
    },
    setIndex(state, action) {
      state.index = action.payload;
    },
    setLoadingPage(state, action) {
      state.loadingPage = action.payload;
    },
    setLoadingImages(state, action) {
      state.loadingImages = action.payload;
    },
    setArrayFilesLength(state, action) {
      state.arrayFilesLength = action.payload;
    },
    clearReport(state) {
      // state.formData = {};
      // state.byImage = [];
      // state.total = {};
      // state.groupsReport = [];
      // state.itemsReport = [];
      // state.groupsReportByImage = [];
      // state.index = 0;
      // state.loadingPage = false;
      // state.loadingImages = false;
      // state.arrayFilesLength = 0;
      return initialState;
    },
  },
});

export const {
  setFormData,
  setReportData,
  setReportGroups,
  setReportItems,
  setReportGroupsByImage,
  setIndex,
  setLoadingPage,
  setLoadingImages,
  setArrayFilesLength,
  clearReport,
} = reportSlice.actions;
export default reportSlice.reducer;
