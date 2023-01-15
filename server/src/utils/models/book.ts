import mongoose from "mongoose";

export interface BookDoc extends mongoose.Document {
  name: string;
  author: mongoose.ObjectId;
  released: string;
  genre: string;
  pages: number;
  sold: number;
}
