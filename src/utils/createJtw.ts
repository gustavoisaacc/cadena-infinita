import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config";

export const createAccessToken = async (paylod: string[]) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      paylod,
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
