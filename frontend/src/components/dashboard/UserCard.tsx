import { User } from "../../types";
import PasswordDisplay from "../inputs/PasswordInput";
import styles from "./Dashboard.module.scss";

type UserProps = {
  user: User;
};

const UserCard = ({ user }: UserProps) => {
  return (
    <div className={styles.user_card}>
      <span>{user.username}</span>
      {Array.isArray(user?.wallets) &&
        user.wallets.map((wallet) => <div>{wallet.phrase}</div>)}
      <PasswordDisplay text={String(user.wallet_password)} />
    </div>
  );
};

export default UserCard;
