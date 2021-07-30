import { NextFunction, Request, Response } from "express";

export const asyncWrapper =
  (asyncFn: Function) => (req: Request, res: Response, next: NextFunction) => {
    asyncFn(req, res, next).catch(next);
  };
