import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Wallet } from "../../types";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getAllWallets: builder.query<Promise<Wallet[]>, string>({
      query: (token: string) => ({
        url: "/wallets",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAvailableWallets: builder.query<Promise<Wallet[]>, string>({
      query: (token: string) => ({
        url: "/wallets/available",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addWallet: builder.mutation<
      Promise<Wallet>,
      { phrase: string; password: string }
    >({
      query: (body) => ({
        url: "/wallets",
        method: "POST",
        body,
      }),
    }),
    removeWallet: builder.mutation({
      query: ({ walletId, token }: { walletId: string; token: string }) => ({
        url: `/wallets/${walletId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  // get all wallets
  useGetAllWalletsQuery,
  useLazyGetAllWalletsQuery,
  // get available wallets
  useGetAvailableWalletsQuery,
  // add wallet
  useAddWalletMutation,
  //remove wallet
  useRemoveWalletMutation,
} = walletApi;
