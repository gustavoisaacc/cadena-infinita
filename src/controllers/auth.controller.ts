import { Request, Response } from "express";
import User from "../models/user.model";
import { checkPassword } from "../utils/validateHandle";
import { createAccessToken } from "../utils/createJtw";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const checkResult = await User.findOne({ email });
  if (!checkResult) return res.status(301).json({ message: "Invalid email" });

  const checkPass = await checkPassword(checkResult.password, password);

  if (!checkPass) return res.status(301).json({ message: "Invalid password" });
  const id = JSON.stringify(checkResult._id);
  const token = await createAccessToken(id);

  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "none",
    //secure: true,
    maxAge: 24 * 60 * 60 * 100, //1 day
  });

  res.json(checkResult);
};
