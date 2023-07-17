import { ObjectId } from "mongoose";
import styles from "./Dashboard.module.scss";
import {
  useGetAllWalletsQuery,
  useRemoveWalletMutation,
} from "../../features/wallets/walletService";
import { useUser } from "../../hooks/useUser";

interface User {
  role?: string;
  _id?: ObjectId;
  password?: string;
  username?: string;
  token?: string;
  wallets: Wallet[];
}

interface Wallet {
  _id?: ObjectId;
  user?: User | string;
  phrase?: string;
  password?: string;
  status?: string;
}

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
