import styles from "./Wallets.module.scss";
import { useRemoveWalletMutation } from "../../../features/wallets/walletService";
import { useUser } from "../../../hooks/useUser";
import { Wallet } from "../../../types";
import { useAllUsers } from "../../../hooks/useAllUsers";
import UserSelect from "./UserSelect";
import { useAllWallets } from "../../../hooks/useAllWallets";

interface WalletProps {
  wallet: Wallet;
}

const WalletCard = ({ wallet }: WalletProps) => {
  // Get user
  const user = useUser();

  // Get all users
  const { allUsers } = useAllUsers();
  console.log(allUsers, "all users");

  // Get refetch for wallets
  const { refetchWallets } = useAllWallets();

  // Wallet removal handler
  const [removeWallet] = useRemoveWalletMutation();
  const handleRemoveWallet = async () => {
    await removeWallet({
      walletId: String(wallet._id),
      token: user?.token as string,
    }).then(() => refetchWallets());
  };

  return (
    <div className={styles.wallet_card}>
      <span>{wallet.address}</span>
      <div>
        {typeof wallet.user === "string" ? wallet.user : wallet.user?.username}
        <UserSelect
          userId={
            typeof wallet?.user !== "string" ? String(wallet?.user?._id) : ""
          }
        />
      </div>
      <button
        className={styles.wallet_delete_btn}
        onClick={() => void handleRemoveWallet()}
      >
        X
      </button>
    </div>
  );
};

export default WalletCard;
