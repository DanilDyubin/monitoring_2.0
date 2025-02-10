import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // date: null,
  open: false,
  groupId: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setOpen(state, action) {
      state.open = action.payload;
    },
    setGroupId(state, action) {
      state.groupId = action.payload;
    },
  },
});

export const { setDate, setOpen, setGroupId } = calendarSlice.actions;
export default calendarSlice.reducer;
