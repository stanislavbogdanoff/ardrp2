import React from "react";
import { useGetAllUsersQuery } from "../../features/auth/authService";
import { useUser } from "../../hooks/useUser";
import Section from "../../components/layout/Section";
import UserCard from "../../components/dashboard/UserCard";

const UsersTab = () => {
  // Get user
  const user = useUser();
  console.log(user);

  // Get all users
  const { data: allUsers, isFetching: usersIsFetching } = useGetAllUsersQuery(
    String(user?.token)
  );

  console.log(allUsers, "all users");
  return (
    <>
      <Section ver>
        {Array.isArray(allUsers) &&
          allUsers.map((user) => <UserCard user={user} />)}
      </Section>
    </>
  );
};

export default UsersTab;
