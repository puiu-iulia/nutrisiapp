import axios from 'axios';
import {
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { AuthState } from './slice';

const API_URL = 'http://192.168.0.101:3000/api/v1/auth';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    data: { email: string; password: string },
    { rejectWithValue },
  ) => {
    //console.log(data);
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        data,
        config,
      );
      console.log(response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    data: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        data,
        config,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const token =
        await SecureStore.getItemAsync('auth_token');
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async function () {
    await SecureStore.deleteItemAsync('auth_token');
  },
);

export const setAuthData = createAction<AuthState>(
  'auth/setAuthData',
);
