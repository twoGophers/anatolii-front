import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios';

const initialState = {
  data: null,
  status: 'loading',
  user: null
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
});

export const { actions: testActions, reducer: testReducer } = testSlice;

export default testSlice.reducer;