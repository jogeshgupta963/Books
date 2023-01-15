import request from "supertest";
import { app } from "../../../app";

it("signout successfully", async () => {
  const cookie = await global.getCookie();
  const resp = await request(app)
    .post("/api/user/signout")
    .send({})
    .set("Cookie", cookie)
    .expect(200);
  expect(resp.body.success).toEqual(true);
});

it("signout unsuccessfully", async () => {
  const resp = await request(app)
    .post("/api/user/signout")
    .send({})
    .expect(400);
  expect(resp.body.success).toEqual(false);
});
