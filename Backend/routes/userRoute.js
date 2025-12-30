import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";

import userAuthMiddleware from "../middlewares/userAuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// 🔒 Protected route
userRouter.get("/profile", userAuthMiddleware, getProfile);

export default userRouter;
