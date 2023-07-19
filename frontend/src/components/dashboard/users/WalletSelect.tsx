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

// TODO: NO NEED TO FILTER WALLETS, THEY ALREADY HAVE "AVAILABLE" IF THEY ARE NOT TAKEN

const WalletSelect = ({ user }: { user: User }) => {
  // Get current user
  const currUser = useUser();

  // Define taken wallets before passing to query
  const takenWallets: Wallet[] = currUser?.wallets ?? [];
  // Get available wallets
  const { availableWallets, refetchAvailableWallets } = useAvailableWallets({
    takenWallets: takenWallets,
  });

  // Chosen wallet state and initial assign
  const [chosenWallet, setChosenWallet] = useState<string>("");
  useEffect(() => {
    if (!chosenWallet && availableWallets.length > 0) {
      setChosenWallet(String(availableWallets[0]._id));
    }
  }, [chosenWallet, availableWallets]);

  // Refetch users function
  const { refetchUsers } = useAllUsers();

  // Assign wallet function
  const [assignWallet] = useAssignWalletMutation();
  const handleAssignWallet = async () => {
    await assignWallet({
      user: String(user?._id),
      wallet: String(chosenWallet),
      token: String(currUser?.token),
    })
      .then(() => refetchUsers())
      .then(() => refetchAvailableWallets());
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
