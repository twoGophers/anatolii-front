import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ui: typeof window !== 'undefined' && localStorage.getItem('lang') ? localStorage.getItem('lang') : "RU",
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateLang: (state, action) => {
      state.ui = action.payload;
    },
  },
});

export const { updateLang } = uiSlice.actions;
export default uiSlice.reducer;
