import { useState } from "react";
import Section from "../../components/layout/Section";
import TextInput from "../../components/inputs/TextInput";
import { TextInputEventType, User, Wallet } from "../../types";
import {
  useAddWalletMutation,
  useGetAllWalletsQuery,
} from "../../features/wallets/walletService";
import { useUser } from "../../hooks/useUser";
import WalletCard from "../../components/dashboard/WalletCard";
import { useAllUsers } from "../../hooks/useAllUsers";

const WalletsTab = () => {
  // Initial state
  const [walletData, setWalletData] = useState({
    phrase: "",
    password: "",
  });

  // Get user
  const user = useUser() as User;

  // Get all wallets
  const {
    data: wallets,
    isFetching: walletsIsFetching,
    refetch: refetchWallets,
  } = useGetAllWalletsQuery();

  // Add wallet
  const [addWallet] = useAddWalletMutation();
  async function handleAddWallet() {
    await addWallet(walletData).then(() => refetchWallets());
  }

  // Get all users
  const allUsers = useAllUsers();

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
        {walletsIsFetching ? (
          <>Wallets are loading</>
        ) : (
          <>
            {Array.isArray(wallets) &&
              wallets.map((wal: Wallet) => (
                <WalletCard key={String(wal._id)} wallet={wal} />
              ))}
          </>
        )}
      </Section>
    </>
  );
};

export default WalletsTab;
