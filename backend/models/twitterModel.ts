import { Schema, model } from "mongoose";

const twitterSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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
    email :{
      type: Schema.Types.ObjectId,
      ref: "Email"
    }
  },
  { timestamps: true, collection: "twitters" }
);

twitterSchema.index({ twitter_username: 1 });

export const Twitter = model("Twitter", twitterSchema);
