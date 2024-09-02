import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

interface DeleteItemPayload {
  id: number | string;
  name: string;
}

const initialState = {
  catalog: null,
  catalogAll: null,
  subloading: false,
  suberror: '',
  subCatalogAll: null
};

export const sendCardData = createAsyncThunk(
  'catalog/sendCardData',
  async (formData: any) => {
    const response = await axios.post('/catalog/create-card', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
);

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

export const catalogItems = createAsyncThunk(
  'catalog',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/catalog');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

export const catalogSubCategory = createAsyncThunk(
  'catalog/sub-create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/catalog/sub-create', formData, {
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

export const catalogSubItems = createAsyncThunk(
  'catalog/sub-items',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/catalog/sub-items');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

export const deleteItem = createAsyncThunk(
  'catalog/delete-item',
  async ({ id, name }: { id: string; name: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/catalog/delete/${id}?name=${name}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const updateCatalog = createAsyncThunk(
  'catalog/update-item',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/catalog/update/${id}`, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
)

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
      .addCase(catalogMain.rejected, (state) => {
        state.catalog = null;
      })
      .addCase(catalogItems.pending, (state) => {
        state.subloading = true;
        state.suberror = '';
      })
      .addCase(catalogItems.fulfilled, (state, action) => {
        state.subloading = false;
        state.catalogAll = action.payload;
        state.suberror = '';
      })
      .addCase(catalogItems.rejected, (state, action) => {
        state.subloading = false;
        state.suberror = action.payload as string;
      })
      .addCase(catalogSubItems.pending, (state) => {
        state.subCatalogAll = null;
      })
      .addCase(catalogSubItems.fulfilled, (state, action) => {
        state.subCatalogAll = action.payload;
      })
      .addCase(catalogSubItems.rejected, (state) => {
        state.subCatalogAll = null;
      });
  },
});

export default catalogSlice.reducer;
