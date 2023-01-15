import mongoose from "mongoose";
import { BookDoc } from "../utils";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    released: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

export const Book = mongoose.model<BookDoc>("Book", bookSchema);
