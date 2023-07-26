import styles from "./Wallets.module.scss";
import { useAllUsers } from "../../../hooks/useAllUsers";

const UserSelect = ({ userId }: { userId: string }) => {
  // Get all users
  const { allUsers } = useAllUsers();

  return (
    <select name="" id="" value={userId} className={styles.users_select}>
      {Array.isArray(allUsers) &&
        allUsers.map((user) => (
          <option value={String(user._id)} key={String(user._id)}>
            {user?.username}
          </option>
        ))}
    </select>
  );
};

export default UserSelect;
