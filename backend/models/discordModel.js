const mongoose = require("mongoose");

const discordSchema = mongoose.Schema(
  {
    discord_username: {
      type: String,
      requried: true,
      unique: true,
    },
    discord_password: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Email",
    },
    twitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Twitter",
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
    collection: "discords",
  }
);

module.exports = new mongoose.model("Discord", discordSchema);
