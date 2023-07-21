import styles from "./Users.module.scss";
import { User } from "../../../types";
import WalletSelect from "./WalletSelect";
import UserWallet from "./UserWallet";
import { useAvailableWallets } from "../../../hooks/useAvailableWallets";

const UserCard = ({ user }: { user: User }) => {
  // Get available wallets
  const { availableWallets } = useAvailableWallets();

  return (
    <div className={styles.user_card}>
      <span>{user.username}</span>
      <div className={styles.wallets_list}>
        {Array.isArray(user.wallets) &&
          user.wallets.map((wallet) => (
            <UserWallet key={String(wallet._id)} wallet={wallet} />
          ))}
      </div>
      <WalletSelect hasAvailableWallets user={user} />
    </div>
  );
};

export default UserCard;
