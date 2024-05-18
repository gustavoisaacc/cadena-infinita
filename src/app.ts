import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookies from "cookie-parser";

import { connectDB } from "./configs/db";
import { routeRole } from "./routes/roles.routes";
import { createRole } from "./utils/initialSetup";
import { routrUser } from "./routes/user.routes";
import { routerAuth } from "./routes/auth.routes";

export const app = express();
app.use(morgan("dev"));
app.use(cookies());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CONFIG
connectDB();
createRole();

//routes
app.use("/api/v1/role", routeRole);
app.use("/api/v1/user", routrUser);
app.use("/api/v1/auth", routerAuth);

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
