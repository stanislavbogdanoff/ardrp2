import { useState } from "react";
import styles from "../../components/dashboard/Dashboard.module.scss";
import Section from "../../components/layout/Section";
import TextInput from "../../components/inputs/TextInput";
import { TextInputEventType, User, Wallet } from "../../types";
import {
  useAddWalletMutation,
  useGetAllWalletsQuery,
} from "../../features/wallets/walletService";
import { useUser } from "../../hooks/useUser";
import WalletCard from "../../components/dashboard/wallets/WalletCard";
import { useAllWallets } from "../../hooks/useAllWallets";

const WalletsTab = () => {
  // Initial state
  const [walletData, setWalletData] = useState({
    phrase: "",
    password: "",
  });

  // Get user
  const user = useUser() as User;

  // Get all wallets
  const { allWallets, walletsIsFetching, refetchWallets } = useAllWallets();

  // Add wallet
  const [addWallet] = useAddWalletMutation();
  async function handleAddWallet() {
    await addWallet(walletData).then(() => refetchWallets());
  }

  return (
    <>
      <Section>
        {user && user.role === "admin" ? (
          <>
            <TextInput
              onChange={(e: TextInputEventType) =>
                setWalletData({ ...walletData, phrase: e.target.value })
              }
            />
            <TextInput
              onChange={(e: TextInputEventType) =>
                setWalletData({ ...walletData, password: e.target.value })
              }
            />
            <button onClick={() => void handleAddWallet()}>Add Wallet</button>
          </>
        ) : null}
      </Section>
      <Section ver>
        <div className={styles.wallet_card_list}>
          {walletsIsFetching ? (
            <>Wallets are loading</>
          ) : (
            <>
              {Array.isArray(allWallets) &&
                allWallets.map((wal: Wallet) => (
                  <WalletCard key={String(wal._id)} wallet={wal} />
                ))}
            </>
          )}
        </div>
      </Section>
    </>
  );
};

export default WalletsTab;
