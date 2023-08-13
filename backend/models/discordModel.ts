import { Schema, model } from "mongoose";

const discordSchema = new Schema(
  {
    username: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: Schema.Types.ObjectId,
      ref: "Email",
      unique: true,
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
        project: {
          type: Schema.Types.ObjectId,
          ref: "Project",
        },
        transactions: {
          type: Number,
          default: 0,
        },
      },
    ],
    status: {
      type: String,
      default: "Available",
    },
  },
  {
    timestamps: true,
    collection: "discords",
  }
);

export const Discord = model("Discord", discordSchema);
