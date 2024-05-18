import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { UserSchemaType } from "../schemas/user.schema";
import Role from "../models/roles.model";
import { findOneUtil } from "../utils/fineOneUtil";
import { hashPassword } from "../utils/validateHandle";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: UserSchemaType = req.body;
  const newUser = await new User(data);
  newUser.password = await hashPassword(data.password);
  try {
    if (data.role) {
      const foundRole = await Role.findOne({ name: { $in: data.role } });
      if (!foundRole)
        return res.status(400).json({ message: "role not found" });
      newUser.role = Array(foundRole).map((role) => role?._id);
    } else {
      const role = await Role.findOne({ name: "customer" });
      newUser.role = [role?._id];
    }
  } catch (error) {
    next(error);
  }
  await newUser.save();
  return res.json({ mesage: "user created sussessfully" });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UserSchemaType = req.body;

  const userFound = await findOneUtil({ id });

  userFound.name = data.name;
  userFound.username = data.username;
  userFound.name = data.name;
  userFound.fullname = data.fullname;
  userFound.email = data.email;
  userFound.password = data.password;

  await userFound.save();
  res.status(200).json({ message: "user updated successfully " });
};

export const getUser = async (_req: Request, res: Response) => {
  const users = await User.find().populate("role");
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UserSchemaType = req.body;
  const userFound = await findOneUtil({ id });
  userFound.isActive = data.isActive;

  res.json({ message: "user successfully disabled" });
};
