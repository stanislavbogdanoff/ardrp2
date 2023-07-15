import express from "express";
import { Router } from "express";
import {
  getAllWallets,
  getRandomWallet,
} from "../controllers/walletController";

const router: Router = Router();

router.get("/", getAllWallets);
router.get("/random", getRandomWallet);

export default router;
