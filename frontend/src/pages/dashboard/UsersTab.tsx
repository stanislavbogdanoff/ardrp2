import React from "react";
import { useGetAllUsersQuery } from "../../features/auth/authService";
import { useUser } from "../../hooks/useUser";

const UsersTab = () => {
  // Get user
  const user = useUser();

  // Get all users
  const { data: allUsers, isFetching: usersIsFetching } = useGetAllUsersQuery(
    String(user?.token)
  );

  console.log(allUsers, "all users");
  return <div>UsersTab</div>;
};

export default UsersTab;
