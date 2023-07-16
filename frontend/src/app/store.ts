import { configureStore } from "@reduxjs/toolkit";
import { walletApi } from "../features/wallets/walletService";
import { authApi } from "../features/auth/authService";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(walletApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
