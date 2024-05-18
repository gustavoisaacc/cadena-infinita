import Router from "express-promise-router";

import * as roleController from "../controllers/role.controller";
import { verifyToken } from "../middlewares/authValidate";

export const routeRole = Router();

routeRole.post("/create-role", verifyToken, roleController.createRole);
routeRole.put("/update-role/:id", verifyToken, roleController.updateRole);
routeRole.delete("/:id", verifyToken, roleController.deleteRole);
