import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: String;
  email: String;
  password: String;
  role: String;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export default mongoose.model<IUser>("User", userSchema);
