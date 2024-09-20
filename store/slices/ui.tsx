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
  },
  icon: 3,
  modalMobileMenu: {
    show: false
  },
  showMobileMenuLink: {
    show: false
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
    fullImageshow: (state, action) => {
      state.modalFullImage.show = action.payload.show;
      state.modalFullImage.image = action.payload.image;
    },
    changeIcon: (state, action) => {
      state.icon = action.payload;
    },
    showMobileMenu: (state, action) => {
      state.modalMobileMenu.show = action.payload;
    },
    showMobileMenuLink: (state, action) => {
      state.showMobileMenuLink.show = action.payload;
    }
  },
});

export const { updateLang, setModalFull, fullImageshow, changeIcon, showMobileMenu, showMobileMenuLink } = uiSlice.actions;
export default uiSlice.reducer;
