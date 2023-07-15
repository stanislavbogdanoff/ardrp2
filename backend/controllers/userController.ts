import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

//@desc   Register new user
//@route  POST /api/users
//@access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user: IUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  if (user) res.status(200).json(user);
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user: IUser | null = await User.findOne({ username: username });
  if (
    user &&
    (await bcrypt.compare(password.toString(), user.password.toString()))
  ) {
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const generateToken = (id: String) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser };
