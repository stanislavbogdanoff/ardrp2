import styles from "./Users.module.scss";
import { Wallet } from "../../../types";
import { useUnassignWalletMutation } from "../../../features/auth/authService";
import { useUser } from "../../../hooks/useUser";
import { useAllUsers } from "../../../hooks/useAllUsers";
import { useAvailableWallets } from "../../../hooks/useAvailableWallets";

const UserWallet = ({ wallet }: { wallet: Wallet }) => {
  // Get user
  const user = useUser();

  // Refetch users function
  const { refetchUsers } = useAllUsers();

  // Get available wallets
  const { refetchAvailableWallets } = useAvailableWallets();

  // Unassign wallet function
  const [unassignWallet] = useUnassignWalletMutation();
  const handleUnassignWallet = async () => {
    try {
      await unassignWallet({
        user: String(wallet?.user),
        wallet: String(wallet?._id),
        token: String(user?.token),
      }).then(() => refetchAvailableWallets());
      await refetchUsers();
    } catch (error) {
      console.error("Error assigning wallet:", error);
    }
  };

  return (
    <div className={styles.user_wallet}>
      <span>{wallet.address}</span>
      <button onClick={() => void handleUnassignWallet()}>X</button>
    </div>
  );
};

export default UserWallet;
