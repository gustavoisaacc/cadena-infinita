import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config";
import User from "../models/user.model";

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.accessToken;
  console.log(req.cookies);
  if (!token) {
    return res.status(401).json({ message: "authorization denied" });
  }
  // TODO: Verify token

  jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const _id = JSON.parse(decoded.payload);
    console.log(_id);
    const user = await User.findById(_id);
    if (!user) return res.status(401).json({ message: "no user found" });

    next();
  });
};
