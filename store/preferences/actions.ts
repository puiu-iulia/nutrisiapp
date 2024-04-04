import {
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { PreferencesState } from './slice';

export const setRecipePreferences = createAction<string[]>(
  'recipes/setRecipePreferences',
);
