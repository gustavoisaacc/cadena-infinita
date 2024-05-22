import Router from "express-promise-router";
import * as userController from "../controllers/user.controller";
import { UserSchema } from "../schemas/user.schema";
import { validate } from "../middlewares/";
import { auth } from "../middlewares";

export const routrUser = Router();

routrUser.post(
  "/new-user",
  [auth.verifyToken, validate.validatorData(UserSchema)],
  userController.createUser
);
routrUser.get(
  "/",
  [auth.verifyToken, auth.isSuperAdmin],
  userController.getUser
);
routrUser.put(
  "/:id",
  [auth.verifyToken, auth.isSuperAdmin],
  userController.updateUser
);
routrUser.delete("/:id", auth.verifyToken, userController.deleteUser);
