const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    email_password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Available",
    },
  },
  { timestamps: true, collection: "emails" }
);

emailSchema.index({ email: 1 });

module.exports = new mongoose.model("Email", emailSchema);
