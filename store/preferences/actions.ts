import {
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

export const setRecipePreferences = createAction<string[]>(
  'recipes/setRecipePreferences',
);
