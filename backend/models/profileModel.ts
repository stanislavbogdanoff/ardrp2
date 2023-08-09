import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wallets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
      },
    ],
    twitter: {
      type: Schema.Types.ObjectId,
      ref: "Twitter",
    },
    email: {
      type: Schema.Types.ObjectId,
      ref: "Email",
    },
    discord: {
      type: Schema.Types.ObjectId,
      ref: "Discord",
    },
    details: String,
  },
  { timestamps: true, collection: "profiles" }
);

export const Profile = model("Profile", profileSchema);
