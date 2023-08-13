import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  username?: string;
  password?: string;
  role?: string;
}

export interface IEmail extends Document {
  user?: string;
  password?: string;
  email?: string;
  status?: string;
}

export interface IDiscord extends Document {
  user?: string;
  password?: string;
  email?: string;
  status?: string;
  wallet?: string;
  twitter?: string;
  projects?: {
    project?: string;
    transaction: number;
  };
}

export interface ITwitter extends Document {
  user?: string;
  username?: string;
  password?: string;
  emai?: string;
  status?: string;
}

export interface UserReq extends Request {
  user?: IUser;
}
