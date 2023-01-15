import { Profession } from "./../utils/models/user";
import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
// @route POST /api/user/signup
// @desc to signup a user
// @visibility Public
async function signup(req: Request, res: Response) {
  // destructure body
  const { name, email, password } = req.body;

  try {
    //find duplicate user
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      throw new Error("User already exists");
    }
    //hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user
    const user = new User({
      email,
      name,
      password,
      profession: req.body.profession || Profession.employee,
    });
    await user.save();

    //generate jwt
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRATION!,
      }
    );
    //cookie
    res.cookie(process.env.COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV! === "prod",
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        data: err.message,
      });
    }
  }
}
// @route POST /api/user/signout
// @desc to signout a user
// @visibility Private
async function signout(req: Request, res: Response) {
  req.cookies[process.env.COOKIE_NAME!] = null;

  return res.json({ success: true });
}
// @route POST /api/user/login
// @desc to login a user
// @visibility Public
async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  //search user
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid Credentials");

    //check password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");

    //generate jwt

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRATION!,
      }
    );

    res.cookie(process.env.COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV! === "prod",
    });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        data: err.message,
      });
    }
  }
}
// @route GET /api/user/
// @desc to get logged in user
// @visibility PRIVATE
async function getCurrentUser(req: Request, res: Response) {
  res.status(200).json({
    success: true,
    data: req.user,
  });
}
export { signup, signout, login, getCurrentUser };
