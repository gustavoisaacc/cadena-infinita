import Router from "express-promise-router";
import { signin } from "../controllers/auth.controller";

export const routerAuth = Router();

routerAuth.post("/signin", signin);
