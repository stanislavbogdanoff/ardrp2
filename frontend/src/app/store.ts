import { configureStore } from "@reduxjs/toolkit";
import { walletApi } from "../features/wallets/walletService";
import { authApi } from "../features/auth/authService";
import authReducer from "../features/auth/authSlice";
import { twitterApi } from "../features/twitters/twitterService";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [twitterApi.reducerPath]: twitterApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      walletApi.middleware,
      authApi.middleware,
      twitterApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
