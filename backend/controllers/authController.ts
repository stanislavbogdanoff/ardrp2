import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { generateToken } from "../utils/generateToken";

//@desc   Register new user
//@route  POST /api/auth/register
//@access Private
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      return res.status(201).json(user);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    console.error("Error creating new user:", err);
    return res.status(500).json({ error: err });
  }
};

//@desc   Login user
//@route  POST /api/auth/login
//@access Public
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  const accessToken = generateToken(user?._id);

  if (
    user &&
    (await bcrypt.compare(password.toString(), String(user.password)))
  ) {
    return res.status(200).json(accessToken);
  } else {
    return res.status(400).json({ error: "User not found" });
  }
};
