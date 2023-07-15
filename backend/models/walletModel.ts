import mongoose, { Document } from "mongoose";

export interface IWallet extends Document {
  user: String;
  phrase: String;
  password: String;
  status: String;
}

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    phrase: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Available",
    },
  },
  {
    timestamps: true,
    collection: "wallets",
  }
);

export default mongoose.model<IWallet>("Wallet", walletSchema);
