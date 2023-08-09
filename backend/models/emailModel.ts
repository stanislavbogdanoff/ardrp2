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

export const Email = model("Email", emailSchema);
