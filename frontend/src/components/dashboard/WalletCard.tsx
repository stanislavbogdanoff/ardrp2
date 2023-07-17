import { ObjectId } from "mongoose";
import styles from "./Dashboard.module.scss";
import {
  useGetAllWalletsQuery,
  useRemoveWalletMutation,
} from "../../features/wallets/walletService";
import { useUser } from "../../hooks/useUser";
import { Wallet } from "../../types";

interface WalletProps {
  wallet: Wallet;
}

const WalletCard = ({ wallet }: WalletProps) => {
  const user = useUser();

  // Get all wallets
  const { refetch: refetchWallets } = useGetAllWalletsQuery();

  const [removeWallet] = useRemoveWalletMutation();

  const handleRemoveWallet = async () => {
    await removeWallet({
      walletId: String(wallet._id),
      token: user?.token as string,
    }).then(() => refetchWallets());
  };

  return (
    <div className={styles.wallet_card}>
      <span>{wallet.phrase}</span>
      <span>
        {typeof wallet.user === "string" ? wallet.user : wallet.user?.username}
      </span>
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
