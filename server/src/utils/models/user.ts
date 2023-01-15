import mongoose from "mongoose";

export enum Profession {
  StoreOwner = "owner",
  employee = "employee",
  author = "author",
  user = "user",
}

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  profession: Profession;
}
