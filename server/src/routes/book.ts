import express from "express";
import { employeeAccess, loggedIn, validateBody } from "../middlewares";
import { authorAccess } from "../middlewares";
import { createBookArgs } from "../utils";
import {
  createBook,
  deleteBook,
  getAllBook,
  getBookById,
  updateBook,
} from "../controllers/book";

const router = express.Router();

router
  .route("/")
  .post(loggedIn, authorAccess, createBookArgs, validateBody, createBook)
  .get(getAllBook);

router
  .route("/:bookId")
  .get(getBookById)
  .delete(loggedIn, authorAccess, deleteBook)
  .put(loggedIn, employeeAccess, updateBook);
export { router as bookRouter };
