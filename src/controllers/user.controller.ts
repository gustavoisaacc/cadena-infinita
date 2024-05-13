import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { UserSchemaType } from "../schemas/user.schema";
import Role from "../models/roles.model";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: UserSchemaType = req.body;
  const newUser = await new User(data);
  try {
    if (data.role) {
      const foundRole = await Role.findOne({ name: { $in: data.role } });
      newUser.role = Array(foundRole).map((role) => role?._id);
    } else {
      const role = await Role.findOne({ name: "customer" });
      newUser.role = role?._id;
    }
  } catch (error) {
    next(error);
  }
  await newUser.save();
  return res.json({ mesage: "user created sussessfully" });
};

export const updateUser = async (_req: Request, _res: Response) => {
  console.log("update");
};

export const deleteUser = async (_req: Request, _res: Response) => {
  console.log("delete");
};
