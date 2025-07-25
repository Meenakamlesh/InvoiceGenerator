import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import invoiceSlice from './invoiceSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    invoice: invoiceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;