import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/slice';
import { recipeApiSlice } from './api/recipes';
import preferencesSlice from './preferences/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    preferences: preferencesSlice,
    [recipeApiSlice.reducerPath]: recipeApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      recipeApiSlice.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
