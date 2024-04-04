import { createSlice } from '@reduxjs/toolkit';

import { setRecipePreferences } from './actions';

export interface PreferencesState {
  loading?: boolean;
  error?: string | null;
  preferences?: string[] | null;
}

const initialState: PreferencesState = {
  loading: false,
  error: null,
  preferences: null,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setRecipePreferences,
      (state, action) => {
        state.preferences = action.payload;
      },
    );
  },
});

export default preferencesSlice.reducer;
