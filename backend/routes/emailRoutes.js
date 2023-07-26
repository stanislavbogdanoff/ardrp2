const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkEmailExists } = require("../controllers/emailController");

router.post("/check", protect, checkEmailExists);

module.exports = router;
