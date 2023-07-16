const mongoose = require("mongoose");
const EmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Available",
    },
  },
  { timestamps: true, collection: "emails" }
);
