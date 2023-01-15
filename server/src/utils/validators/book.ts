import { body } from "express-validator";

export const createBookArgs = [
  body("name").isString().withMessage("Name of the book required"),
  body("released").isString().withMessage("Released Date required"),
  body("genre").isString().withMessage("Genre required"),
  body("pages").isNumeric().withMessage("no of pages required"),
];
