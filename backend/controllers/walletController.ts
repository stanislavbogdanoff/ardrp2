import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Wallet, { IWallet } from "../models/walletModel";

const getAllWallets = asyncHandler(async (req: Request, res: Response) => {
  const wallets: IWallet[] = await Wallet.find();
  if (wallets && wallets.length > 0) res.status(200).json(wallets);
  else {
    res.status(400);
    throw new Error("No wallets");
  }
});

const getRandomWallet = asyncHandler(async (req: Request, res: Response) => {
  const randomWallet: IWallet | null = await Wallet.findOneAndUpdate(
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

export { getAllWallets, getRandomWallet };
