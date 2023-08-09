import { Response } from "express";

export const handleError = (
  err: unknown,
  res: Response,
  errorInput: string
) => {
  console.error(err);
  return res.status(500).json({ error: errorInput });
};
