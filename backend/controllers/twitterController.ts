import { Twitter } from "../models/twitterModel";
import { catchError } from "../utils/catchError";
import { Request, Response } from "express";

export const checkTwitterExists = async (req: Request, res: Response) => {
  const { twitter } = req.body;
  try {
    const foundTwitter = await Twitter.findOne({ twitter: twitter });
    res.status(200).json(!!foundTwitter);
  } catch (error) {
    catchError(error, res, "Could not check if twitter exists");
  }
};
