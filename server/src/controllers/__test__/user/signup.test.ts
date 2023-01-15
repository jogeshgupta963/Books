import request from "supertest";
import { app } from "../../../app";

it("returns a status on successful signup", async () => {
  const resp = await request(app)
    .post("/api/user/signup")
    .send({
      name: "jogesh",
      email: "jogeshgupta963@gmail.com",
      password: "zxcvbnm",
    })
    .expect(201);
  expect(resp.body.success).toEqual(true);
});

it("returns 400 on missed argument", async () => {
  const resp = await request(app)
    .post("/api/user/signup")
    .send({
      email: "jogeshgupta963@gmail.com",
      password: "zxcvbnm",
    })
    .expect(400);
  expect(resp.body.success).toEqual(false);
});

it("duplicate email returns an error", async () => {
  await global.getCookie();

  const resp = await request(app)
    .post("/api/user/signup")
    .send({
      name: "joe",
      email: "joe@gmail.com",
      password: "zxcvbnm",
    })
    .expect(400);
  expect(resp.body.success).toEqual(false);
});
it("check for cookies", async () => {
  const resp = await request(app)
    .post("/api/user/signup")
    .send({
      name: "jogesh",
      email: "jogeshgupta963@gmail.com",
      password: "zxcvbnm",
    })
    .expect(201);
  expect(resp.get("Set-Cookie")).toBeDefined();
});
