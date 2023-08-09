const mongoose = require("mongoose");
const twitterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
