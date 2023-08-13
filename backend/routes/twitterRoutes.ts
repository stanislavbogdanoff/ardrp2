import express from "express";
import { protect } from "../middleware/authMiddleware";
import { checkTwitterExists } from "../controllers/twitterController";

const router = express.Router();

router.post("/check", protect, checkTwitterExists);

module.exports = router;
