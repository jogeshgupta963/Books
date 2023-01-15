import express from "express";
import { signout, signup, login, getCurrentUser } from "../controllers/user";
import { LoginValidationArgs, SignupValidationArgs } from "../utils";
import { validateBody } from "../middlewares";
import { loggedIn } from "../middlewares";

const router = express.Router();

router.route("/").get(loggedIn, getCurrentUser);
router.route("/signup").post(SignupValidationArgs, validateBody, signup);
router.route("/login").post(LoginValidationArgs, validateBody, login);

router.route("/signout").post(loggedIn, signout);

export { router as userRouter };
