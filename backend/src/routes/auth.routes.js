import express from "express";
import {
  getMeController,
  loginController,
  logoutController,
  registerController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import identifyUser from "../middlewares/auth.middleware.js";
import { singleUpload } from "../middlewares/mutler.js";

const authRouter = express.Router();

authRouter.post("/register", singleUpload, registerValidator, registerController);
authRouter.get("/verify-email", identifyUser, verifyEmailController);
authRouter.post("/login", loginValidator, loginController);
authRouter.get("/logout", logoutController);
authRouter.get("/me", identifyUser, getMeController);

export default authRouter;