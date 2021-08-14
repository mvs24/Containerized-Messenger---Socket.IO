import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

const sendDevelopmentError = (error: AppError | Error, res: Response) => {
  if (error instanceof AppError)
    return res.status(error.statusCode).json({
      status: error.status,
      stack: error.stack,
      message: error.message,
      error,
    });

  return res.status(500).json({
    message: error.message,
    stack: error.stack,
    error,
  });
};

const sendProductionError = (error: AppError | Error, res: Response) => {
  if (error instanceof AppError)
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    sendDevelopmentError(error, res);
  } else {
    sendProductionError(error, res);
  }

  next();
};
