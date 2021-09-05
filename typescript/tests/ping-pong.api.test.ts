import { expect } from "chai";
import request from "supertest";

import { app } from "../src/app";
import { describe, it } from "mocha";

describe("PingPong API test", () => {
  it("GET /ping", async () => {
    const result = await request(app).get("/ping");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.eql({ message: "pong" });
  });

  it("GET /pong", async () => {
    const result = await request(app).get("/pong");
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.eql({ message: "ping" });
  });
});
