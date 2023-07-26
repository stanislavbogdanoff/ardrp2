const asyncHandler = require("express-async-handler");
const Twitter = require("../models/twitterModel");

const checkTwitterExists = asyncHandler(async (req, res) => {
  const { twitter } = req.body;
  try {
    const foundTwitter = await Twitter.findOne({ twitter: twitter });
    res.status(200).json(!!foundTwitter);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Could not check if twitter exists",
    });
  }
});

module.exports = { checkTwitterExists };
