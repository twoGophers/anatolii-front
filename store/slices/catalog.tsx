import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  catalog: null,
};

export const catalogMain = createAsyncThunk(
  'catalog/create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/catalog/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(catalogMain.pending, (state) => {
        state.catalog = null;
      })
      .addCase(catalogMain.fulfilled, (state, action) => {
        state.catalog = action.payload;
      })
      .addCase(catalogMain.rejected, (state, action) => {
        state.catalog = null;
      });
  },
});

export default catalogSlice.reducer;
