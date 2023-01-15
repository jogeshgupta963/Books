import { Request, Response } from "express";
import { Book } from "../models/book";
import { Profession } from "../utils";
// @route POST /api/book/
// @desc to  genereate a book
// @visibility PRIVATE => Author
async function createBook(req: Request, res: Response) {
  //find book with same name
  const { name, released, genre, pages } = req.body;

  try {
    const duplicate = await Book.findOne({ name });
    if (duplicate) {
      throw new Error("This book already exists");
    }
    //create new book
    const book = new Book({
      name,
      released,
      genre,
      pages,
      author: req.user!.id,
      sold: 0,
    });
    await book.save();
    return res.status(201).json({
      success: true,
      data: book,
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
// @route GET /api/book/
// @desc to get all books
// @visibility Public
async function getAllBook(req: Request, res: Response) {
  const books = await Book.find({}).populate("author", "name");
  res.status(200).json({
    success: true,
    data: books,
  });
}
// @route GET /api/book/:bookId
// @desc to get  book by id
// @visibility Public
async function getBookById(req: Request, res: Response) {
  const { bookId } = req.params;
  const book = await Book.findById(bookId).populate("author", "name");
  if (!book) {
    return res.status(400).json({
      success: false,
      data: "book not found",
    });
  }
  res.status(200).json({
    success: true,
    data: book,
  });
}
// @route DELETE /api/book/:bookId
// @desc to delete book by id
// @visibility Public => author
async function deleteBook(req: Request, res: Response) {
  const { bookId } = req.params;
  const book = await Book.findOne({
    _id: bookId,
    author: req.user!,
  });
  if (!book) {
    return res.status(400).json({
      success: false,
      data: "book not found",
    });
  }
  await book.deleteOne();
  res.status(200).json({
    success: true,
    data: book,
  });
}

// @route PUT /api/book/:bookId
// @desc to update book by id
// @visibility Private => employee
async function updateBook(req: Request, res: Response) {
  const { bookId } = req.params;
  const book = await Book.findOne({
    _id: bookId,
  });
  if (!book) {
    return res.status(400).json({
      success: false,
      data: "book not found",
    });
  }

  //for authors

  if (req.user!.profession === Profession.author) {
    book.name = req.body.name || book.name;
    book.genre = req.body.genre || book.genre;
    book.pages = req.body.pages || book.pages;
  }
  //for store owners
  if (req.user!.profession === Profession.StoreOwner) {
    book.pages = req.body.pages || book.pages;
    book.sold = req.body.sold || book.sold;
  }

  //for employees
  if (req.user!.profession === Profession.employee) {
    book.sold = req.body.sold || book.sold;
  }

  res.status(200).json({
    success: true,
    data: book,
  });
}

export { createBook, getAllBook, getBookById, deleteBook, updateBook };
