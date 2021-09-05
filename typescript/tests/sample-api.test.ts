import { expect } from "chai";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { describe, it, beforeEach, afterEach } from "mocha";
import { Types } from "mongoose";

import { app } from "../src/app";
import { Sample } from "../src/models/sample";

const { ObjectId } = Types;

describe("Sample API test", () => {
  describe("POST /sample", () => {
    afterEach(async () => {
      const samples = await Sample.find();
      samples.map(async (sample) => {
        await Sample.deleteOne({ _id: sample._id });
      });
    });
    it("return 200 when request is successfully", async () => {
      const result = await request(app)
        .post("/sample")
        .send({ title: "test title" });
      expect(result.statusCode).to.equal(StatusCodes.OK);
      expect(result.body.message).to.eql("sample data saved successfully");
    });
    it("return 400 when request is empty", async () => {
      const result = await request(app).post("/sample");
      expect(result.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(result.body.message).to.eql("title is empty");
    });
  });

  describe("GET /sample", () => {
    afterEach(async () => {
      const samples = await Sample.find();
      samples.map(async (sample: any) => {
        await Sample.deleteOne({ _id: sample._id });
      });
    });
    beforeEach(async () => {
      await Sample.insertMany([
        {
          _id: new ObjectId("60f55deadfc4c906f45f1fba"),
          title: "test title 1",
          createdAt: 1630731952506
        },
        {
          _id: new ObjectId("60f55deadfc4c906f45f1fb1"),
          title: "test title 2",
          createdAt: 1630731952506
        },
        {
          _id: new ObjectId("60f55deadfc4c906f45f1fbb"),
          title: "test title 3",
          createdAt: 1630731952506
        },
        {
          _id: new ObjectId("60f55deadfc4c906f45f1fa1"),
          title: "test title 4",
          createdAt: 1630731952506
        },
        {
          _id: new ObjectId("60f55deadfc4c906f45f1ffb"),
          title: "test title 5",
          createdAt: 1630731952506
        },
        {
          _id: new ObjectId("60f55deadfc4c906fd5f1ffb"),
          title: "test title 6",
          createdAt: 1630731952506
        }
      ]);
    });

    it("return 200 when request is successfully with limit 2", async () => {
      const result = await request(app)
        .get("/sample")
        .query({ page: 1, limit: 2 });
      expect(result.statusCode).to.equal(StatusCodes.OK);
      expect(result.body).to.eql({
        message: "fetched sample data successfully",
        data: [
          {
            _id: "60f55deadfc4c906f45f1fba",
            title: "test title 1",
            createdAt: 1630731952506
          },
          {
            _id: "60f55deadfc4c906f45f1fb1",
            title: "test title 2",
            createdAt: 1630731952506
          }
        ],
        meta: {
          limit: 2,
          total: 6
        }
      });
    });

    it("return 200 when request is successfully with limit 4", async () => {
      const result = await request(app)
        .get("/sample")
        .query({ page: 1, limit: 4 });
      expect(result.statusCode).to.equal(StatusCodes.OK);
      expect(result.body).to.eql({
        message: "fetched sample data successfully",
        data: [
          {
            _id: "60f55deadfc4c906f45f1fba",
            title: "test title 1",
            createdAt: 1630731952506
          },
          {
            _id: "60f55deadfc4c906f45f1fb1",
            title: "test title 2",
            createdAt: 1630731952506
          },
          {
            _id: "60f55deadfc4c906f45f1fbb",
            title: "test title 3",
            createdAt: 1630731952506
          },
          {
            _id: "60f55deadfc4c906f45f1fa1",
            title: "test title 4",
            createdAt: 1630731952506
          }
        ],
        meta: {
          limit: 4,
          total: 6
        }
      });
    });

    it("return 200 when request is successfully with default limit", async () => {
      const result = await request(app).get("/sample");
      expect(result.statusCode).to.equal(StatusCodes.OK);
      expect(result.body).to.eql({
        message: "fetched sample data successfully",
        data: [
          {
            _id: "60f55deadfc4c906f45f1fba",
            title: "test title 1",
            createdAt: 1630731952506
          },
          {
            _id: "60f55deadfc4c906f45f1fb1",
            title: "test title 2",
            createdAt: 1630731952506
          },
          {
            _id: "60f55deadfc4c906f45f1fbb",
            title: "test title 3",
            createdAt: 1630731952506
          },
          {
            _id: "60f55deadfc4c906f45f1fa1",
            title: "test title 4",
            createdAt: 1630731952506
          },
          {
            _id: "60f55deadfc4c906f45f1ffb",
            title: "test title 5",
            createdAt: 1630731952506
          }
        ],
        meta: {
          limit: 5,
          total: 6
        }
      });
    });
  });
});
