const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
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

module.exports = new mongoose.model("Wallet", walletSchema);
