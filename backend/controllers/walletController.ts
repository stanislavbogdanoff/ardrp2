import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Wallet } from "../models/walletModel";
import { catchError } from "../utils/catchError";
import { isValidObjectId } from "mongoose";

export const checkWalletExists = async (req: Request, res: Response) => {
  const { wallet_address } = req.body;
  try {
    const foundWallet = await Wallet.findOne({
      address: wallet_address,
    }).select("_id");
    res.status(200).json(!!foundWallet);
  } catch (error) {
    catchError(error, res, "Could not check wallet");
  }
};

export const getAllWallets = async (req: Request, res: Response) => {
  const wallets = await Wallet.find().populate("user");
  if (wallets && wallets.length > 0) res.status(200).json(wallets);
  else {
    res.status(400);
    throw new Error("No wallets");
  }
};

export const getAvailableWallets = async (req: Request, res: Response) => {
  const wallets = await Wallet.find({ status: "Available" }).populate("user");
  if (wallets && wallets.length > 0) res.status(200).json(wallets);
  else {
    res.status(200).json([]);
  }
};

export const getRandomWallet = async (req: Request, res: Response) => {
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
};

export const addNewWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await Wallet.create(req.body);

    if (wallet) return res.status(200).json(wallet);
    else {
      res.status(400);
      throw new Error("Difficulty adding this wallet");
    }
  } catch (err) {
    catchError(err, res, "Could not add new wallet");
  }
};

//@desc   Add project to wallet
//@route  PATCH /api/wallets/:walletId/add-project
//@access Private

export const addProject = async (req: Request, res: Response) => {
  const { walletId } = req.params;
  const { projects } = req.body;
  try {
    const updatedWallet = await Wallet.findByIdAndUpdate(walletId, {
      $push: {
        projects: { $each: projects },
      },
    });

    return res.status(200).json(updatedWallet);
  } catch (err) {
    catchError(err, res, "Could not add project to wallet");
  }
};

export const removeWallet = async (req: Request, res: Response) => {
  const walletId = req.params.walletId;

  try {
    const wallet = await Wallet.findByIdAndDelete(walletId);

    if (!isValidObjectId(walletId))
      res.status(400).json({ error: "Invalid wallet id" });

    const user = await User.findOneAndUpdate(
      { _id: wallet?.user },
      { wallet: null }
    );

    if (wallet) res.status(200).json(wallet);
    else {
      res.status(400);
      throw new Error("Could not delete wallet");
    }
  } catch (err) {
    catchError(err, res, "Could not delete wallet");
  }
};
