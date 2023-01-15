import { Profession } from "./../../../utils";
import request from "supertest";
import { app } from "../../../app";

it("delete book successfully", async () => {
  const cookie = await global.getCookie(Profession.author);

  const resp = await request(app)
    .post("/api/book/")
    .send({
      name: "Psycology of money",
      released: "idk",
      genre: "philosophical",
      pages: 201,
    })
    .set("Cookie", cookie)
    .expect(201);
  expect(resp.body.success).toEqual(true);
  expect(resp.body.data.name).toEqual("Psycology of money");

  //delete book
  const del = await request(app)
    .delete(`/api/book/${resp.body.data.id}`)
    .send({})
    .set("Cookie", cookie)
    .expect(200);
  expect(del.body.success).toEqual(true);

  //get the same book
  const book = await request(app)
    .get(`/api/book/${del.body.data.id}`)
    .send({})
    .set("Cookie", cookie)
    .expect(400);
  expect(book.body.success).toEqual(false);
  console.log(book.body);
});
