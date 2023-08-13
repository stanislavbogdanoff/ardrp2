import express from "express";
import { protect } from "../middleware/authMiddleware";
import { parseNewDiscords } from "../controllers/discordController";

const router = express.Router();

router.post("/parse", protect, parseNewDiscords);

module.exports = router;
