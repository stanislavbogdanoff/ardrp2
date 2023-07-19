import { useGetAvailableWalletsQuery } from "../features/wallets/walletService";
import { Wallet } from "../types";
import { useUser } from "./useUser";

export const useAvailableWallets = ({
  takenWallets,
}: {
  takenWallets: Wallet[];
}) => {
  // Get user
  const user = useUser();

  // Get all walelts
  const { data: availableWallets, refetch: refetchAvailableWallets } =
    useGetAvailableWalletsQuery(String(user?.token), {
      skip: !user?.token, // Skip if the user's not defined
    });

  // Declare wallets filtered
  let filteredWallets: Wallet[] = [];

  if (
    availableWallets &&
    Array.isArray(availableWallets) &&
    availableWallets.length > 0
  ) {
    filteredWallets = availableWallets.filter(
      (wallet) => !takenWallets.some((el) => el._id === wallet._id)
    );
  }

  return { availableWallets: filteredWallets, refetchAvailableWallets };
};
