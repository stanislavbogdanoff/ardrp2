import { User } from "./../models/userModel";
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { UserReq } from "../types/types";

const protect = async (req: UserReq, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      // Get user from the token
      req.user = (await User.findById(decoded.id))!;

      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { protect };
