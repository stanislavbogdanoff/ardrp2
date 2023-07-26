import { useGetAllWalletsQuery } from "../features/wallets/walletService";
import { useUser } from "./useUser";

export const useAllWallets = () => {
  // Get user
  const user = useUser();

  // Get all wallets
  const {
    data: allWallets,
    isFetching: walletsIsFetching,
    isLoading: walletsIsLoading,
    refetch: refetchWallets,
  } = useGetAllWalletsQuery(String(user?.token), {
    skip: !user?.token, // Skip if the user's not defined
  });

  return { allWallets, walletsIsFetching, walletsIsLoading, refetchWallets };
};
