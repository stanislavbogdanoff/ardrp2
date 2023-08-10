import { Schema, model } from "mongoose";

const discordSchema = new Schema(
  {
    username: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: Schema.Types.ObjectId,
      ref: "Email",
    },
    twitter: {
      type: Schema.Types.ObjectId,
      ref: "Twitter",
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
    collection: "discords",
  }
);

export const Discord = model("Discord", discordSchema);
