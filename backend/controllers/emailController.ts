import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Email } from "../models/emailModel";

export const checkEmailExists = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const foundEmail = await Email.findOne({ email: email });
      res.status(200).send(!!foundEmail);
    } catch (error) {
      console.error("Error while checking document existence:", error);
      res
        .status(500)
        .json({ error: "Error while checking document existence." });
    }
  }
);
