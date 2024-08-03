import { Request, Response, NextFunction } from "express";

import { getUserByToken } from "../Service/AuthService";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const user = getUserByToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
