const asyncHandler = require("express-async-handler");
const Wallet = require("../models/walletModel");
const User = require("../models/userModel");
const { isValidObjectId } = require("mongoose");

const getAllWallets = asyncHandler(async (req, res) => {
  const wallets = await Wallet.find().populate("user");
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

const addNewWallet = asyncHandler(async (req, res) => {
  const wallet = await Wallet.create(req.body);

  if (wallet) res.status(200).json(wallet);
  else {
    res.status(400);
    throw new Error("Difficulty adding this wallet");
  }
});

const removeWallet = asyncHandler(async (req, res) => {
  const walletId = req.params.walletId;
  const wallet = await Wallet.deleteOne({ _id: walletId });

  if (!isValidObjectId(walletId))
    res.status(400).json({ error: "Invalid wallet id" });

  const user = await User.findOneAndUpdate(
    { _id: wallet.user },
    { wallet: null }
  );

  if (wallet) res.status(200).json(wallet);
  else {
    res.status(400);
    throw new Error("Couldn't delete wallet");
  }
});

module.exports = { getAllWallets, getRandomWallet, addNewWallet, removeWallet };
