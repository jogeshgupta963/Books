import request from "supertest";
import { app } from "../../../app";

it("get logged in user successfully", async () => {
  const cookie = await global.getCookie();
  const resp = await request(app)
    .get("/api/user/")
    .send({})
    .set("Cookie", cookie)
    .expect(200);
  expect(resp.body.success).toEqual(true);
  expect(resp.body.data.email).toEqual("joe@gmail.com");
});

it("get logged in user unsuccessfully", async () => {
  const resp = await request(app).get("/api/user/").send({}).expect(400);
  expect(resp.body.success).toEqual(false);
});
