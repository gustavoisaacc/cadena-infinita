import Router from "express-promise-router";

import * as roleController from "../controllers/role.controller";

export const routeRole = Router();

routeRole.post("/create-role", roleController.createRole);
routeRole.put("/update-role/:id", roleController.updateRole);
routeRole.delete("/:id", roleController.deleteRole);
