const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { parseNewDiscords } = require("../controllers/discordController");

router.post("/parse", protect, parseNewDiscords);

module.exports = router;
