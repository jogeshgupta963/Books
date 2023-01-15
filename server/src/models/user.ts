import { Profession, UserDoc } from "../utils/index";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    profession: {
      type: String,
      enum: Profession,
      default: Profession.user,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
    timestamps: true,
  }
);

export const User = mongoose.model<UserDoc>("User", userSchema);
