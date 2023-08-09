import express from "express";
import {
  getAllUsers,
  assignWallet,
  unassignWallet,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.patch("/wallet", protect, assignWallet);
router.patch("/wallet/remove", protect, unassignWallet);

module.exports = router;
