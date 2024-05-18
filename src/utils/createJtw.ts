import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config";

export const createAccessToken = async (payload: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { payload: payload },
      JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
