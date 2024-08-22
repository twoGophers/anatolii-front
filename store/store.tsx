import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ui from './slices/ui';

const rootReducer = combineReducers({
  ui: ui,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;