import express from "express";
import { getMe, protect, signup, getOtherUsers } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);
router.get("/me", protect, getMe);

router.get("/other-users", protect, getOtherUsers);

export default router;
