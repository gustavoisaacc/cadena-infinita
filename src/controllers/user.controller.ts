import { Request, Response } from "express";
import User from "../models/user.model";

export const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  const user = await new User(data);
  user.save();
  res.json({ mesage: "user created sussessfully", user: user });
};

export const updateUser = async (_req: Request, _res: Response) => {
  console.log("update");
};

export const deleteUser = async (_req: Request, _res: Response) => {
  console.log("delete");
};
