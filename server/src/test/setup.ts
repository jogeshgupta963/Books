import mongoose from "mongoose";
import { connectDb } from "../database/connectDb";
import "dotenv/config";
import request from "supertest";
import { app } from "../app";
import { Profession } from "../utils";

declare global {
  function getCookie(
    profession?: Profession,
    email?: string
  ): Promise<string[]>;
}

beforeAll(async () => {
  await connectDb(process.env.MONGO_URI_TESTING!);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }
});

// afterAll(done => {
//   // Closing the DB connection allows Jest to exit successfully.
//   mongoose.connection.close()
//   done()
// })

global.getCookie = async (profession?: Profession, email?: string) => {
  const name = "joe";
  const emailStr = email || "joe@gmail.com";
  const password = "zxcvbnm";

  const resp = await request(app)
    .post("/api/user/signup")
    .send({
      name,
      email: emailStr,
      password,
      profession: profession || Profession.StoreOwner,
    })
    .expect(201);

  const cookie = resp.get("Set-Cookie");

  return cookie;
};
