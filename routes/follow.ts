import express from "express";
import { protect } from "../controllers/auth";
import {
  followUser,
  getMyFollowings,
  unfollowUser,
} from "../controllers/follower";

const router = express.Router();

router.post("/:userId", protect, followUser);
router.get("/my-followings", protect, getMyFollowings);
router.patch("/unfollow/:id", protect, unfollowUser);

export default router;
