import request from "supertest";
import { app } from "../../../app";
import { Profession } from "../../../utils";

it("get all books ", async () => {
  await request(app).get("/api/book").send({}).expect(200);
});

it("get  book by id", async () => {
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
  const res = await request(app)
    .get(`/api/book/${resp.body.data.id}`)
    .send({})
    .expect(200);
  expect(resp.body.success).toEqual(true);
});
