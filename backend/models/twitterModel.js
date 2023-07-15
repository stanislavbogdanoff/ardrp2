import mongoose from "mongoose";

const TwitterSchema = new mongoose.Schema(
  {
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
      required: true,
      default: "Available",
    },
  },
  { timestamps: true, collection: "twitters" }
);
