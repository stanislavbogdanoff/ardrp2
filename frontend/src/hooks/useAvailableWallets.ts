import { useEffect, useState } from "react";
import { useGetAvailableWalletsQuery } from "../features/wallets/walletService";
import { Wallet } from "../types";
import { useUser } from "./useUser";

export const useAvailableWallets = () => {
  // Get user
  const user = useUser();

  // Get all walelts
  const { data: availableWallets, refetch: refetchAvailableWallets } =
    useGetAvailableWalletsQuery(String(user?.token), {
      skip: !user?.token, // Skip if the user's not defined
    });

  const [resolvedAvailableWallets, setResolvedAvailableWallets] = useState<
    Wallet[]
  >([]);

  useEffect(() => {
    // When the availableWallets data is available (resolved), set it to the state
    if (availableWallets && Array.isArray(availableWallets)) {
      setResolvedAvailableWallets(availableWallets);
    }
  }, [availableWallets]);

  return {
    availableWallets: resolvedAvailableWallets,
    refetchAvailableWallets,
  };
};
