import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../utils/asyncWrapper";

export const signup = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {}
);
