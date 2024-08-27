import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ui: typeof window !== 'undefined' && localStorage.getItem('lang') ? localStorage.getItem('lang') : "RU",
  modalFull: {
    show: false,
    index: null,
    images: [],
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateLang: (state, action) => {
      state.ui = action.payload;
    },
    setModalFull: (state, action) => {
      state.modalFull = action.payload;
      
    }
  },
});

export const { updateLang, setModalFull } = uiSlice.actions;
export default uiSlice.reducer;
