const express = require("express");
const router = express.Router();
const {
  getAllWallets,
  getRandomWallet,
  addNewWallet,
  removeWallet,
  getAvailableWallets,
  checkWalletExists,
} = require("../controllers/walletController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllWallets);
router.post("/", addNewWallet);
router.post("/check", protect, checkWalletExists);
router.get("/available", protect, getAvailableWallets);
router.get("/random", getRandomWallet);
router.delete("/:walletId", protect, removeWallet);

module.exports = router;
