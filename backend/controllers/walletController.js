const asyncHandler = require("express-async-handler");
const Wallet = require("../models/walletModel");

const getAllWallets = asyncHandler(async (req, res) => {
  const wallets = await Wallet.find();
  if (wallets && wallets.length > 0) res.status(200).json(wallets);
  else {
    res.status(400);
    throw new Error("No wallets");
  }
});

const getRandomWallet = asyncHandler(async (req, res) => {
  const randomWallet = await Wallet.findOneAndUpdate(
    {
      status: "Available",
    },
    { status: "Taken" }
  );
  if (randomWallet) res.status(200).json(randomWallet);
  else {
    res.status(400);
    throw new Error("No available wallets");
  }
});

module.exports = { getAllWallets, getRandomWallet };