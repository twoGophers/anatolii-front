import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

interface AdminState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  verify: string | null;
}

const initialState: AdminState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  verify: null
};

export const loginAdmin = createAsyncThunk( 'admin/login', async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/admin/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyAdmin = createAsyncThunk(
    'admin/verify',
    async ({ token }: { token: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post('/admin/verify', { token });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyAdmin.pending, (state) => {
        state.verify = null;
      })
      .addCase(verifyAdmin.fulfilled, (state, action) => {
        state.verify = action.payload;
      })
      .addCase(verifyAdmin.rejected, (state, action) => {
        state.verify = null;
      });
  },
});

export default adminSlice.reducer;
