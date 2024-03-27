import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/slice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
