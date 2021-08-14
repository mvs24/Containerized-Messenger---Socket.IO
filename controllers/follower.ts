import { NextFunction, Request, Response } from "express";
import Follower from "../models/follower";
import User from "../models/user";
import { AppError } from "../utils/AppError";
import { asyncWrapper } from "../utils/asyncWrapper";

export const followUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userToFollowId = req.params.userId;

    if (!userToFollowId)
      return next(new AppError("User to follow id must be defined", 400));
    const existingUserToFollow = await User.findById(userToFollowId);
    if (!existingUserToFollow)
      return next(new AppError("User to follow does not exist", 404));

    const existingFollowRelation = await Follower.findOne({
      follower: req.user._id,
      following: userToFollowId,
    });

    if (existingFollowRelation) {
      return next(new AppError("You have followed this user", 400));
    }

    const newFollowRelation = Follower.build({
      follower: req.user._id,
      following: userToFollowId,
    });

    await newFollowRelation.save();

    res.status(201).json({
      status: "success",
      data: newFollowRelation,
    });
  }
);

export const getMyFollowers = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const myFollowings = await Follower.find({
      follower: req.user._id,
    });

    return res.status(200).json({
      status: "success",
      data: myFollowings,
    });
  }
);
