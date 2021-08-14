import express from "express";
import { protect } from "../controllers/auth";
import { followUser } from "../controllers/follower";

const router = express.Router();

router.post("/:userId", protect, followUser);

export default router;
