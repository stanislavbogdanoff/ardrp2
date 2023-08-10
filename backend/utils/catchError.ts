import { Response } from "express";

export const catchError = (err: unknown, res: Response, errorInput: string) => {
  console.error(err);
  return res
    .status(500)
    .json({ error: `Internal server error: ${errorInput}` });
};
