const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    wallet_password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
    },
    wallets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = new mongoose.model("User", userSchema);
