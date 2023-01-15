import { body } from "express-validator";

export const SignupValidationArgs = [
  body("name").isString().withMessage("Name is Required"),
  body("email").isEmail().withMessage("Email is Required"),
  body("password").isString().withMessage("Password is Required"),
];
export const LoginValidationArgs = [
  body("email").isEmail().withMessage("Email is Required"),
  body("password").isString().withMessage("Password is Required"),
];
