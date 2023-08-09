import { Request } from "express";
import { Document } from "mongoose";

// Callback function for multer storage
export type DestinationCallback = (
  error: Error | null,
  destination: string
) => void;

export interface IUser extends Document {
  username?: string;
  password?: string;
  role?: string;
}

export interface UserReq extends Request {
  user?: IUser;
}
