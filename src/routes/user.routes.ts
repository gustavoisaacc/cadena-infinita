import Router from "express-promise-router";
import * as userController from "../controllers/user.controller";
import { validatorData } from "../middlewares/validatorData";
import { UserSchema } from "../schemas/user.schema";

export const routeAuth = Router();

routeAuth.post(
  "/new-user",
  validatorData(UserSchema),
  userController.createUser
);
routeAuth.put("/:id", userController.updateUser);
routeAuth.delete("/:id", userController.deleteUser);
