import { ObjectId } from "mongoose";

export type TextInputEventType = React.ChangeEvent<HTMLInputElement>;

export type OnChangeFunctionType = React.ChangeEventHandler<HTMLInputElement>;

export interface User {
  _id?: ObjectId;
  username?: string;
  password?: string;
  role?: string;
  token?: string;
  wallets: Wallet[];
}

export interface Wallet {
  _id?: ObjectId;
  user?: User | string;
  phrase?: string;
  password?: string;
  status?: string;
}
