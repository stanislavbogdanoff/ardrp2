const mongoose = require("mongoose");
const twitterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    twitter_username: {
      type: String,
      required: true,
    },
    twitter_password: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Email",
    },
    status: {
      type: String,
      default: "Available",
    },
  },
  { timestamps: true, collection: "twitters" }
);

twitterSchema.index({ twitter_username: 1 });

module.exports = new mongoose.model("Twitter", twitterSchema);
