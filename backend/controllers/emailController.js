const asyncHandler = require("express-async-handler");
const Email = require("../models/emailModel");

const checkEmailExists = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const foundEmail = await Email.findOne({ email: email });
    res.status(200).send(!!foundEmail);
  } catch (error) {
    console.error("Error while checking document existence:", error);
    res.status(500).json({ error: "Error while checking document existence." });
  }
});

module.exports = { checkEmailExists };
