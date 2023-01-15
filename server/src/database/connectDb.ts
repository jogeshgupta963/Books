import mongoose from "mongoose";

async function connectDb(uri: string) {
  mongoose.set("strictQuery", true);
  return mongoose.connect(uri);
}

export { connectDb };
