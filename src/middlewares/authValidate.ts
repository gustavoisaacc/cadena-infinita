import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config";
import User from "../models/user.model";

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "authorization denied" });
  }
  // TODO: Verify token

  jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "no user found" });

    user?.role.map((role: any) => {
      if (role.name === "admin") {
        console.log("admin");
      }
    });
    next();
  });
};
