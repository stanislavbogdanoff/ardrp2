import styles from "./Users.module.scss";
import { User } from "../../../types";
import WalletSelect from "./WalletSelect";
import UserWallet from "./UserWallet";

const UserCard = ({ user }: { user: User }) => {
  console.log(user, "user");
  return (
    <div className={styles.user_card}>
      <span>{user.username}</span>
      <div className={styles.wallets_list}>
        {Array.isArray(user.wallets) &&
          user.wallets.map((wallet) => <UserWallet wallet={wallet} />)}
      </div>
      <WalletSelect user={user} />
    </div>
  );
};

export default UserCard;
