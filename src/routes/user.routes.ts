import Router from "express-promise-router";
import * as userController from "../controllers/user.controller";
import { UserSchema } from "../schemas/user.schema";
import { validatorData } from "../middlewares/validatorData";
import { verifyToken } from "../middlewares/authValidate";

export const routrUser = Router();

routrUser.post(
  "/new-user",
  [verifyToken, validatorData(UserSchema)],
  userController.createUser
);
routrUser.get("/", verifyToken, userController.getUser);
routrUser.put("/:id", userController.updateUser);
routrUser.delete("/:id", userController.deleteUser);
