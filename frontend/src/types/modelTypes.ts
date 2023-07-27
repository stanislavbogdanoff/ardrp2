import { ObjectId } from "mongoose";

export interface User {
  _id?: ObjectId;
  username?: string;
  password?: string;
  role?: string;
  token?: string;
  wallets?: Wallet[];
  wallet_password?: string;
}

export interface Wallet {
  _id?: ObjectId;
  user?: User | string;
  phrase?: string;
  password?: string;
  status?: string;
  address?: string;
}

export interface Email {
  _id?: ObjectId;
  user?: User | string;
  email?: string;
  email_password?: string;
  status?: string;
}

export interface Twitter {
  _id?: ObjectId;
  user?: User | string;
  twitter_username?: string;
  twitter_password?: string;
  email?: Email | string;
  status?: string;
}
