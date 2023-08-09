import { Schema, model } from "mongoose";

const walletTypeSchema = new Schema(
  {
    name: String,
  },
  {
    collection: "wallet_types",
  }
);

export const WalletType = model("WalletType", walletTypeSchema);
