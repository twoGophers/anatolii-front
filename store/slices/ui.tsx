import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ui: typeof window !== 'undefined' && localStorage.getItem('lang') ? localStorage.getItem('lang') : "RU",
  modal: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateLang: (state, action) => {
      state.ui = action.payload;
    },
    modalStyle: (state, action) => {
      state.modal = action.payload;
    }
  },
});

export const { updateLang, modalStyle } = uiSlice.actions;
export default uiSlice.reducer;
