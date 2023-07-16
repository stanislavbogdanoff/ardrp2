import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Types } from "mongoose";

interface Wallet {
  user?: string;
  phrase?: string;
  password?: string;
  status?: string;
}

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    addWallet: builder.mutation<Promise<Wallet>, Wallet>({
      query: (body) => ({
        url: "/wallets",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddWalletMutation } = walletApi;
