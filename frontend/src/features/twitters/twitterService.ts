import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Twitter } from "../../types";

export const twitterApi = createApi({
  reducerPath: "twitterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/twitters" }),
  endpoints: (builder) => ({
    checkTwitterExists: builder.mutation<
      boolean,
      { twitter: string; token: string }
    >({
      query: ({ twitter, token }) => ({
        url: "/check",
        method: "POST",
        body: { twitter: twitter },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCheckTwitterExistsMutation } = twitterApi;
