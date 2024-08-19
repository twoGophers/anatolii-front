import { configureStore, combineReducers } from '@reduxjs/toolkit';
import testReducer from './slices/test';

const rootReducer = combineReducers({
  test: testReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;