import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import { connectDB } from "./configs/db";
import { routeRole } from "./routes/roles.routes";
import { routeAuth } from "./routes/user.routes";
import { createRole } from "./utils/initialSetup";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//CONFIG
connectDB();
createRole();
//routes
app.use("/api/v1/role", routeRole);
app.use("/api/v1/user", routeAuth);

//errors
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.code === 11000) {
    res.status(401).json({
      message: "Duplicate value entered for the field",
    });
  } else {
    res.status(err.status || 500).json({
      message: err.message || "Something went wrong",
    });
  }
});
