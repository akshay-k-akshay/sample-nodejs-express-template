const { expect } = require("chai");
const request = require("supertest");
const { describe, it } = require("mocha");

const { app } = require("../src/app");

describe("PingPong API test", () => {
  it("GET /ping", async () => {
    const result = await request(app).get("/ping");
    expect(result.body).to.eql({ message: "pong" });
    expect(result.statusCode).to.equal(200);
  });

  it("GET /pong", async () => {
    const result = await request(app).get("/pong");
    expect(result.body).to.eql({ message: "ping" });
    expect(result.statusCode).to.equal(200);
  });
});
