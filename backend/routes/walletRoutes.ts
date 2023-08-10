import express from "express";
import {
  getAllWallets,
  getRandomWallet,
  addNewWallet,
  removeWallet,
  getAvailableWallets,
  checkWalletExists,
  addProject,
} from "../controllers/walletController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getAllWallets);
router.post("/", protect, addNewWallet);
router.post("/check", protect, checkWalletExists);
router.get("/available", protect, getAvailableWallets);
router.get("/random", getRandomWallet);
router.delete("/:walletId", protect, removeWallet);
router.patch("/:walletId/add-project", protect, addProject);

module.exports = router;
