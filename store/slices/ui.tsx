import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ui: typeof window !== 'undefined' && localStorage.getItem('lang') ? localStorage.getItem('lang') : "RU",
  modalFull: {
    show: false,
    index: null,
    images: [],
  },

  modalFullImage: {
    show: false,
    image: null
  }
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
    },
    fullImageshow: ( state, action) => {
      console.log(action.payload.show);
      console.log(action.payload.image);
      
      state.modalFullImage.show = action.payload.show;
      state.modalFullImage.image = action.payload.image;
    }
  },
});

export const { updateLang, setModalFull, fullImageshow } = uiSlice.actions;
export default uiSlice.reducer;
