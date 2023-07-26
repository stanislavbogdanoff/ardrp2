const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { checkTwitterExists } = require("../controllers/twitterController");
const router = express.Router();

router.post("/check", protect, checkTwitterExists);

module.exports = router;
