import { NextFunction, Request, Response } from "express";
import { Profession } from "../utils";

async function authorAccess(req: Request, res: Response, next: NextFunction) {
  if (req.user!.profession === Profession.author) {
    next();
    return;
  }
  res.status(400).json({
    success: false,
    data: "Not Authorised",
  });
}
async function ownerAccess(req: Request, res: Response, next: NextFunction) {
  if (req.user!.profession === Profession.StoreOwner) {
    next();
    return;
  }
  res.status(400).json({
    success: false,
    data: "Not Authorised",
  });
}
async function employeeAccess(req: Request, res: Response, next: NextFunction) {
  if (req.user!.profession !== Profession.user) {
    next();
    return;
  }
  res.status(400).json({
    success: false,
    data: "Not Authorised",
  });
}

export { employeeAccess, ownerAccess, authorAccess };
