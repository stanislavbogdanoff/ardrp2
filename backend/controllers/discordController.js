const asyncHandler = require("express-async-handler");
const Discord = require("../models/discordModel");
const Email = require("../models/emailModel");

//@desc   Add new discord
//@route  POST /api/discords
//@access Private
const addNewDiscord = asyncHandler(async (req, res) => {
  const discord = await Discord.create(req.body);
  if (discord) res.status(201).json(discord);
  else {
    res.status(400);
    throw new Error("Could not add new discord");
  }
});

//@desc   Parse new disords
//@route  POST /api/discords/parse
//@access Private
const parseNewDiscords = asyncHandler(async (req, res) => {
  const { discordsString } = req.body;
  const discords = discordsString.split("\n");
  let parsedDiscords = [];
  let parsedEmails = [];

  discords.forEach((ds) => {
    const splitDs = ds.split(":");

    parsedDiscords.push({
      discord_username: splitDs[0],
      discord_password: splitDs[1],
      email: splitDs[3],
    });

    parsedEmails.push({
      email: splitDs[3],
      email_password: splitDs[4],
    });
  });

  try {
    const newEmails = await Email.insertMany(parsedEmails, { ordered: false });

    let newParsedDiscords = [];

    parsedDiscords.forEach((ds) =>
      newParsedDiscords.push({
        ...ds,
        email: newEmails.find((em) => em.email === ds.email)._id,
      })
    );

    const newDiscords = await Discord.insertMany(newParsedDiscords, {
      ordered: false,
    });

    res.status(201).json({ discords: newDiscords, emails: newEmails });
  } catch (error) {
    res.status(201).json({
      message:
        "Some Discord entries were not unique but others have been created.",
    });
  }
});

module.exports = {
  addNewDiscord,
  parseNewDiscords,
};
