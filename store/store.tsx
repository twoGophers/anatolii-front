import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ui from './slices/ui';
import adminReducer from './slices/admin';
import catalogReducer from './slices/catalog';

const rootReducer = combineReducers({
  ui: ui,
  admin: adminReducer,
  catalog: catalogReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;