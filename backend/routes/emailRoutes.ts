import express from "express";
import { protect } from "../middleware/authMiddleware";
import { checkEmailExists } from "../controllers/emailController";

const router = express.Router();

router.post("/check", protect, checkEmailExists);

module.exports = router;
