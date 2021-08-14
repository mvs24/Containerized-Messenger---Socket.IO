import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { AppError } from "../utils/AppError";
import { asyncWrapper } from "../utils/asyncWrapper";
import jwt from "jsonwebtoken";

interface UserPayload {
  _id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const isEmailValid = function (inputValue: string): boolean {
  return /\S+@\S+\.\S+/.test(inputValue);
};

const JWT_SECRET = "JWT_SECRET";
const signToken = (payload: UserPayload) => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

export const signup = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, lastname, email, password } = req.body;

    if (!name || !lastname)
      return next(new AppError("Name and lastname are required!", 400));
    if (!isEmailValid(email)) return next(new AppError("Email invalid", 400));
    if (password.length < 6)
      return next(new AppError("Password must be greater than 6 chars", 400));

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError("User already exists", 400));

    const newUser = User.build({
      name,
      lastname,
      email,
      password,
    });
    await newUser.save();

    const token = signToken({ _id: newUser._id });

    return res.status(201).json({
      status: "success",
      data: newUser,
      token,
    });
  }
);

export const protect = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You need to be logged in to do this action", 401)
      );
    }

    const payload = jwt.verify(token, JWT_SECRET) as UserPayload;
    const user = await User.findById(payload._id);
    if (!user) {
      return next(new AppError("User does not exists!", 404));
    }

    req.user = user;

    next();
  }
);

export const getMe = asyncWrapper(
  async (req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
      status: "success",
      data: req.user,
    });
  }
);

export const getOtherUsers = asyncWrapper(
  async (req: Request, res: Response, _next: NextFunction) => {
    const page: number = req.query.page
      ? parseInt(req.query.page as string)
      : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    const skip = (page - 1) * limit;

    const otherUsers = await User.find({ _id: { $ne: req.user._id } })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: "success",
      data: otherUsers,
    });
  }
);
