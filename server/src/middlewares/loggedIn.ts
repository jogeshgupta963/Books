import { User } from "./../models/user";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { UserDoc } from "../utils";

interface Payload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserDoc;
    }
  }
}

async function loggedIn(req: Request, res: Response, next: NextFunction) {
  // fetching cookie
  const decoded = req.cookies[process.env.COOKIE_NAME!];

  try {
    if (!decoded) {
      throw new Error("NOT AUTHORISED");
    }
    const payload = jwt.verify(decoded, process.env.JWT_SECRET!) as Payload;
    //fetch user

    const user = (await User.findById(payload.id)) as UserDoc;
    req.user = user;
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        data: err.message,
      });
    }
    return res.status(400).json({
      success: false,
      data: "something went wrong!!",
    });
  }
  next();
}

export { loggedIn };
