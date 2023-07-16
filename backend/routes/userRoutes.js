const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  loginUser,
  registerUser,
  assignWallet,
  unassignWallet,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, registerUser);
router.get("/", protect, getAllUsers);
router.post("/login", loginUser);
router.patch("/wallet", protect, assignWallet);
router.patch("/wallet/remove", protect, unassignWallet);

module.exports = router;
