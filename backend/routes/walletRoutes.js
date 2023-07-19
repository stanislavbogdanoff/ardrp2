const express = require("express");
const router = express.Router();
const {
  getAllWallets,
  getRandomWallet,
  addNewWallet,
  removeWallet,
} = require("../controllers/walletController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllWallets);
router.post("/", addNewWallet);
router.get("/random", getRandomWallet);
router.delete("/:walletId", protect, removeWallet);

module.exports = router;
