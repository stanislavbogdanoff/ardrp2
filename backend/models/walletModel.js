const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
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

module.exports = new mongoose.model("Wallet", walletSchema);