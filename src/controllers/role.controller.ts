import { Request, Response } from "express";
import Role from "../models/roles.model";

export const createRole = async (req: Request, res: Response) => {
  const data = req.body;
  let role = await new Role(data);

  if (!role) {
    role = new Role("customer");
  }

  role.save();
  res.status(201).json({ message: "Role created successfully" });
};

export const updateRole = async (_req: Request, _res: Response) => {
  console.log("update");
};

export const deleteRole = async (_req: Request, _res: Response) => {
  console.log("delete");
};
