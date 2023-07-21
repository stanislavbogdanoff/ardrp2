import { useEffect, useState } from "react";
import {
  useAssignWalletMutation,
  useUnassignWalletMutation,
} from "../../../features/auth/authService";
import { useAllWallets } from "../../../hooks/useAllWallets";
import { SelectInputEventType, User, Wallet } from "../../../types";
import styles from "./Users.module.scss";
import { useUser } from "../../../hooks/useUser";
import { useAllUsers } from "../../../hooks/useAllUsers";
import { useAvailableWallets } from "../../../hooks/useAvailableWallets";

const WalletSelect = ({ user }: { user: User }) => {
  // Get current user
  const currUser = useUser();

  // Get available wallets
  const { availableWallets, refetchAvailableWallets } = useAvailableWallets();

  // Chosen wallet state and initial assign
  const [chosenWallet, setChosenWallet] = useState<string>("");
  useEffect(() => {
    if (!chosenWallet && availableWallets?.length > 0) {
      setChosenWallet(String(availableWallets[0]?._id));
    }
  }, [chosenWallet, availableWallets]);

  // Refetch users function
  const { refetchUsers } = useAllUsers();

  // Assign wallet function
  const [assignWallet] = useAssignWalletMutation();
  const handleAssignWallet = async () => {
    try {
      await assignWallet({
        user: String(user?._id),
        wallet: String(chosenWallet),
        token: String(currUser?.token),
      }).then(() => refetchAvailableWallets());
      // Wait for the wallet assignment to complete before refetching
      await refetchUsers();
    } catch (error) {
      console.error("Error assigning wallet:", error);
    }
  };

  return (
    <div>
      {availableWallets && Array.isArray(availableWallets) && (
        <select
          onChange={(e: SelectInputEventType) =>
            setChosenWallet(String(e.target.value))
          }
          value={chosenWallet}
        >
          {availableWallets.length < 1 ? (
            <option value="">No available wallets</option>
          ) : null}
          {availableWallets.map((wallet) => (
            <option key={String(wallet?._id)} value={String(wallet?._id)}>
              {wallet.address}
            </option>
          ))}
        </select>
      )}
      <button onClick={() => void handleAssignWallet()}>Assign!</button>
    </div>
  );
};

export default WalletSelect;
