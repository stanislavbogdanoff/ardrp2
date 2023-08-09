import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phrase: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    wallet_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WalletType",
    },
    connected_wallets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
      },
    ],
    emails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Email",
      },
    ],
    discords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discord",
      },
    ],
    twitters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Twitter",
      },
    ],
    status: {
      type: String,
      default: "Available",
    },
  },
  {
    timestamps: true,
    collection: "wallets",
  }
);

walletSchema.index({ address: 1 });

export const Wallet = mongoose.model("Wallet", walletSchema);
