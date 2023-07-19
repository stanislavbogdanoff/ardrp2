import { useGetAllUsersQuery } from "../features/auth/authService";
import { useUser } from "./useUser";

export const useAllUsers = () => {
  // Get user
  const user = useUser();

  // Get all users
  const {
    data: allUsers,
    isFetching: usersIsFetching,
    isLoading: usersIsLoading,
    refetch: refetchUsers,
  } = useGetAllUsersQuery(String(user?.token), {
    skip: !user?.token, // Skip if token was not recieved yet
  });

  return { allUsers, usersIsFetching, usersIsLoading, refetchUsers };
};
