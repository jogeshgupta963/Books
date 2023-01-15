import { Profession } from "./../../../utils";
import request from "supertest";
import { app } from "../../../app";

it("createBook successfully", async () => {
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
});

it("miss arguments", async () => {
  const cookie = await global.getCookie(Profession.author);

  const resp = await request(app)
    .post("/api/book/")
    .send({
      name: "Psycology of money",
      //   released: "idk",
      genre: "philosophical",
      pages: 201,
    })
    .set("Cookie", cookie)
    .expect(400);
  expect(resp.body.success).toEqual(false);
});

it("create book without being logged in", async () => {
  const cookie = await global.getCookie(Profession.author);

  const resp = await request(app)
    .post("/api/book/")
    .send({
      name: "Psycology of money",
      released: "idk",
      genre: "philosophical",
      pages: 201,
    })
    .expect(400);
  expect(resp.body.success).toEqual(false);
});

it("create book with employee access", async () => {
  const cookie = await global.getCookie(Profession.employee);

  const resp = await request(app)
    .post("/api/book/")
    .send({
      name: "Psycology of money",
      released: "idk",
      genre: "philosophical",
      pages: 201,
    })
    .set("Cookie", cookie)
    .expect(400);
  expect(resp.body.success).toEqual(false);
});

it("create book with owner access", async () => {
  const cookie = await global.getCookie(Profession.StoreOwner);

  const resp = await request(app)
    .post("/api/book/")
    .send({
      name: "Psycology of money",
      released: "idk",
      genre: "philosophical",
      pages: 201,
    })
    .set("Cookie", cookie)
    .expect(400);
  expect(resp.body.success).toEqual(false);
});
