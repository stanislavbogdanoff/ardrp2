import { useState } from "react";
import TextInput from "../components/inputs/TextInput";
import { useAddWalletMutation } from "../features/wallets/walletService";
import useUnAuthRedirection from "../hooks/useUnAuthRedirection";

// State type
interface Wallet {
  user?: string;
  phrase?: string;
  password?: string;
  status?: string;
}

const DashboardPage = () => {
  // Initial state
  const [walletData, setWalletData] = useState<Wallet>({
    user: "64b267cc68f6df681f7b3ea0",
    phrase: "",
    password: "",
  });

  // Add wallet
  const [addWallet] = useAddWalletMutation();

  async function handleAddWallet() {
    await addWallet(walletData);
    console.log(walletData);
  }

  // Redirect if not logged in
  useUnAuthRedirection();

  return (
    <>
      <div>DashboardPage</div>
      <TextInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWalletData({ ...walletData, phrase: e.target.value })
        }
      />
      <TextInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWalletData({ ...walletData, password: e.target.value })
        }
      />
      <button onClick={() => void handleAddWallet()}>Add Wallet</button>
    </>
  );
};

export default DashboardPage;
