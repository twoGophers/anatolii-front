import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { CatalogState } from '@/typescript'

const initialState: CatalogState = {
  catalog: [],
  catalogAll: [],
  subloading: false,
  suberror: '',
  subCatalogAll: [],
  cardArr: null,
  cardUrl: [],
  cardOne: null
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

export const getCatalogItems = createAsyncThunk(
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

export const sendSubCategory = createAsyncThunk(
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

export const getSubItems = createAsyncThunk(
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
      const response = await axios.delete(`/catalog/delete-sub/${id}?name=${name}`);
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
      const response = await axios.put(`/catalog/update-catalog/${id}`, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const getCardAll = createAsyncThunk(
  'catalog/card-all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/catalog/card-all');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
)

export const deleteCard = createAsyncThunk(
  'catalog/deleteCard',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/catalog/delete-card/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const putUpdateCard = createAsyncThunk(
  'products/updateCard',
  async ({ id, formData }: any) => {
    try {
      const response = await axios.put(`/catalog/update-card/${id}`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Получение карточек по url категорий
export const getCardQueryUrl = createAsyncThunk(
  'catalog/getCardQuery',
  async({ url }: { url: string }) => {
    try {
      const response = await axios.get(`/catalog/cards-url/${url}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getOneCard = createAsyncThunk(
  'catalog/getOneCard',
  async({ url }: { url: string }) => {
    try {
      const response = await axios.get(`/catalog/card-one/${url}`);
      return response.data;
    } catch (error) {
      console.error(error);
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
        state.catalog = [];
      })
      .addCase(catalogMain.fulfilled, (state, action) => {
        state.catalog = action.payload;
      })
      .addCase(catalogMain.rejected, (state) => {
        state.catalog = [];
      })
      .addCase(getCatalogItems.pending, (state) => {
        state.subloading = true;
        state.suberror = '';
      })
      .addCase(getCatalogItems.fulfilled, (state, action) => {
        state.subloading = false;
        state.catalogAll = action.payload;
        state.suberror = '';
      })
      .addCase(getCatalogItems.rejected, (state, action) => {
        state.subloading = false;
        state.suberror = action.payload as string;
      })
      .addCase(getSubItems.pending, (state) => {
        state.subCatalogAll = [];
      })
      .addCase(getSubItems.fulfilled, (state, action) => {
        state.subCatalogAll = action.payload;
      })
      .addCase(getSubItems.rejected, (state) => {
        state.subCatalogAll = [];
      })
      .addCase(getCardAll.pending, (state) => {
        state.cardArr = null;
      })
      .addCase(getCardAll.fulfilled, (state, action) => {
        state.cardArr = action.payload;
      })
      .addCase(getCardAll.rejected, (state) => {
        state.cardArr = null;
      })
      .addCase(getCardQueryUrl.pending, (state) => {
        state.cardUrl = [];
      })
      .addCase(getCardQueryUrl.fulfilled, (state, action) => {
        state.cardUrl = action.payload;
      })
      .addCase(getCardQueryUrl.rejected, (state) => {
        state.cardUrl = [];
      })
      .addCase(getOneCard.pending, (state) => {
        state.cardOne = null;
      })
      .addCase(getOneCard.fulfilled, (state, action) => {
        state.cardOne = action.payload.length > 0 ? action.payload[0] : null;
      })
      .addCase(getOneCard.rejected, (state) => {
        state.cardOne = null;
      });
  },
});

export default catalogSlice.reducer;
