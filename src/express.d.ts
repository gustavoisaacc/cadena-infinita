import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: any;
      };
    } // or whatever type userId should be
  }
}
