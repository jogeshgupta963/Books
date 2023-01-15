import { Profession } from "./../../../utils";
import request from "supertest";
import { app } from "../../../app";

it("update book successfully with author", async () => {
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
    .put(`/api/book/${resp.body.data.id}`)
    .send({
      name: "Psycology of money v1",
      pages: 202,
    })
    .set("Cookie", cookie)
    .expect(200);
  expect(res.body.success).toEqual(true);
});

it("update book successfully with employee", async () => {
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

  const user2 = await global.getCookie(Profession.employee, "jogesh@gmail.com");
  const res = await request(app)
    .put(`/api/book/${resp.body.data.id}`)
    .send({
      sold: 202,
    })
    .set("Cookie", user2)
    .expect(200);
  expect(res.body.success).toEqual(true);
});

it("update book successfully with owner", async () => {
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

  const user2 = await global.getCookie(
    Profession.StoreOwner,
    "jogesh@gmail.com"
  );
  const res = await request(app)
    .put(`/api/book/${resp.body.data.id}`)
    .send({
      pages: 202,
    })
    .set("Cookie", user2)
    .expect(200);
  expect(res.body.success).toEqual(true);
});

it("invalid bookId", async () => {
  const cookie = await global.getCookie(Profession.author);
  const res = await request(app)
    .put(`/api/book/63bdc0df075d4fa5be6e004a`)
    .send({
      name: "aciaskpfm",
    })
    .set("Cookie", cookie)
    .expect(400);
  expect(res.body.success).toEqual(false);
});

it("auth test ", async () => {
  const res = await request(app)
    .put(`/api/book/63bdc0df075d4fa5be6e004a`)
    .send({
      name: "aciaskpfm",
    })
    .expect(400);
  expect(res.body.success).toEqual(false);
});
