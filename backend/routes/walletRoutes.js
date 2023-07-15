const express = require("express");
const router = express.Router();
const {
  getAllWallets,
  getRandomWallet,
} = require( "../controllers/walletController");
const { protect } = require("../middleware/authMiddleware");


router.get("/", getAllWallets);
router.get("/random", getRandomWallet);

module.exports = router;