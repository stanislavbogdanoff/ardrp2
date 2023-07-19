import { useState } from "react";
import {
  useAssignWalletMutation,
  useUnassignWalletMutation,
} from "../../../features/auth/authService";
import { useAllWallets } from "../../../hooks/useAllWallets";
import { SelectInputEventType, User } from "../../../types";
import styles from "./Users.module.scss";
import { useUser } from "../../../hooks/useUser";

const WalletSelect = ({ user }: { user: User }) => {
  const currUser = useUser();

  // Chosen wallet state
  const [chosenWallet, setChosenWallet] = useState("");

  // Get all wallets
  const { allWallets } = useAllWallets();

  // Assign wallet function
  const [assignWallet] = useAssignWalletMutation();
  const handleAssignWallet = async () => {
    await assignWallet({
      user: String(user?._id),
      wallet: chosenWallet,
      token: String(currUser?.token),
    });
  };

  return (
    <div>
      <select
        onChange={(e: SelectInputEventType) =>
          setChosenWallet(String(e.target.value))
        }
      >
        {Array.isArray(allWallets) &&
          allWallets.map((wallet) => (
            <option value={String(wallet?._id)}>{wallet.address}</option>
          ))}
      </select>
      <button onClick={() => void handleAssignWallet()}>Assign!</button>
    </div>
  );
};

export default WalletSelect;
