import { Response, NextFunction } from "express";
import { CustomRequest } from "../typings /express";
import { JWT_SECRET } from "../configs/config";

import jwt from "jsonwebtoken";
import Role from "../models/roles.model";
import User from "../models/user.model";

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
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
    req.userId = JSON.parse(decoded.payload);

    const user = await User.findById(req.userId);

    if (!user) return res.status(401).json({ message: "no user found" });

    next();
  });
};

export const isSuperAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);
  const role = await Role.find({ _id: { $in: user?.role } });
  if (role[0].name !== "superadmin")
    return res.status(401).json({ message: "no authorization" });
  next();
};

export const isCustomer = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);
  const role = await Role.find({ _id: { $in: user?.role } });
  if (role[0].name !== "superadmin")
    return res.status(401).json({ message: "no authorization" });
  next();
};

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);
  const role = await Role.find({ _id: { $in: user?.role } });
  if (role[0].name !== "superadmin")
    return res.status(401).json({ message: "no authorization" });
  next();
};
