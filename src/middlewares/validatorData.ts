import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validatorData =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json(
            error.issues.map((issu) => ({
              issue: issu.message,
              path: issu.path,
            }))
          );
      }

      return res.status(500).json({ error: "Internal server error" });
    }
    return;
  };
