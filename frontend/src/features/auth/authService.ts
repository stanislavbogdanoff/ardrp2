import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/users" }),
  endpoints: (builder) => ({
    login: builder.mutation<
      Promise<{ token: string }>,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "/login",
        method: "POST",
        body: { username, password },
      }),
    }),
    register: builder.mutation<
      Promise<{ token: string }>,
      { name: string; email: string; password: string }
    >({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query<Promise<User[]>, string>({
      query: (token: string) => ({
        url: "/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetAllUsersQuery } =
  authApi;