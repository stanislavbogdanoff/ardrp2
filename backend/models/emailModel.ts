import { Schema, model } from "mongoose";

const emailSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
  { timestamps: true, collection: "emails" }
);

export const Email = model("Email", emailSchema);
