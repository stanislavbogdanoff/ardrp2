import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Wallet } from "../models/walletModel";
import { catchError } from "../utils/catchError";
import { isValidObjectId } from "mongoose";

//@desc   Get all users
//@route  GET /api/users
//@access Private
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate({
      path: "wallets",
      model: "Wallet",
    });

    if (users && Array.isArray(users)) {
      return res.status(200).json(users);
    } else {
      res.status(400).json({ error: "Users not found" });
    }
  } catch (err) {
    catchError(err, res, "Could not get all users");
  }
};

//@desc   Assign wallet to user
//@route  PATCH /api/users/wallet
//@access Private
export const assignWallet = async (req: Request, res: Response) => {
  const { user, wallet } = req.body;

  if (!isValidObjectId(user) || !isValidObjectId(wallet)) {
    res.status(400);
    throw new Error("Invalid user or wallet ID");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: user },
    {
      $push: {
        wallets: wallet,
      },
    }
  );

  const updatedWallet = await Wallet.findOneAndUpdate(
    { _id: wallet },
    { user: user, status: "Taken" }
  );

  if (updatedUser && updatedWallet) res.status(200).json(updatedUser);
  else {
    res.status(400);
    throw new Error("Failed to update user or wallet");
  }
};

//@desc   Remove wallet from user
//@route  PATCH /api/users/wallet/remove
//@access Private
export const unassignWallet = async (req: Request, res: Response) => {
  const { user, wallet } = req.body;

  if (!isValidObjectId(user) || !isValidObjectId(wallet)) {
    res.status(400);
    throw new Error("Invalid user or wallet ID");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: user },
    {
      $pull: {
        wallets: wallet,
      },
    }
  );

  const updatedWallet = await Wallet.findOneAndUpdate(
    { _id: wallet },
    { user: null, status: "Available" }
  );

  if (updatedUser && updatedWallet) return res.status(200).json(updatedUser);
  else {
    return res.status(400).json({ error: "Could not update user" });
  }
};
