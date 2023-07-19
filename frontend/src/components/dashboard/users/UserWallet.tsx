import styles from "./Users.module.scss";
import { Wallet } from "../../../types";
import { useUnassignWalletMutation } from "../../../features/auth/authService";
import { useUser } from "../../../hooks/useUser";
import { useAllUsers } from "../../../hooks/useAllUsers";

const UserWallet = ({ wallet }: { wallet: Wallet }) => {
  // Get user
  const user = useUser();

  // Refetch users function
  const { refetchUsers } = useAllUsers();

  // Unassign wallet function
  const [unassignWallet] = useUnassignWalletMutation();
  const handleUnassignWallet = async () => {
    await unassignWallet({
      user: String(wallet?.user),
      wallet: String(wallet?._id),
      token: String(user?.token),
    }).then(() => refetchUsers());
  };

  return (
    <div className={styles.user_wallet}>
      <span>{wallet.address}</span>
      <button onClick={() => void handleUnassignWallet()}>X</button>
    </div>
  );
};

export default UserWallet;