import { useState } from "react";
import { useGetAllUsersQuery } from "../features/auth/authService";
import { useUser } from "./useUser";

export const useAllUsers = () => {
  const user = useUser()
  const {data: allUsers} = useGetAllUsersQuery(String(user?.token))
  return allUsers;
};
