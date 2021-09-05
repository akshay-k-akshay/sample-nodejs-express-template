import sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinonChai from "sinon-chai";
import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import { mockReq, mockRes } from "sinon-express-mock";

import { SampleController } from "../../src/controllers";
import { sampleService } from "../../src/services";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("sample controller", () => {
  let req: any;
  let res: any;
  let createStub: any;
  let listStub: any;
  let next: any;

  beforeEach(() => {
    createStub = sinon.stub(sampleService, "create");
    listStub = sinon.stub(sampleService, "list");
    next = sinon.fake();
    res = mockRes();
  });
  afterEach(() => {
    sinon.restore();
  });
  describe("create", () => {
    it("success", async () => {
      req = mockReq({
        body: {
          title: "test title"
        }
      });

      await SampleController.create(req, res, next);
      expect(res.status).to.be.calledWith(StatusCodes.OK);
      expect(res.json).to.be.calledWith({
        message: "sample data saved successfully",
        data: undefined
      });
      expect(createStub).to.be.callCount(1);
      expect(createStub).to.be.calledWith({ title: "test title" });
    });
    it("error", async () => {
      const error = new Error("some error");
      createStub.rejects(error);
      await SampleController.create(req, res, next);
      expect(createStub).to.be.calledWith();
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });
  });

  describe("list", () => {
    it("success", async () => {
      res = mockRes({
        query: {
          limit: 10,
          page: 1
        }
      });
      listStub.resolves({
        data: [
          {
            createdAt:
              "Thu Sep 02 2021 21:48:43 GMT+0530 (India Standard Time)",
            _id: "6130f9632ad0364924c9feac",
            __v: 0
          }
        ],
        meta: {
          total: 5,
          limit: 10
        }
      });
      await SampleController.list(req, res, next);
      expect(res.status).to.be.calledWith(StatusCodes.OK);
      expect(listStub).to.be.callCount(1);
      expect(listStub).to.have.been.calledWith();
      expect(res.json).to.be.calledWith({
        message: "fetched sample data successfully",
        data: [
          {
            createdAt:
              "Thu Sep 02 2021 21:48:43 GMT+0530 (India Standard Time)",
            _id: "6130f9632ad0364924c9feac",
            __v: 0
          }
        ],
        meta: { total: 5, limit: 10 }
      });
    });

    it("error", async () => {
      res = mockRes();
      const error = new Error("some error");
      listStub.rejects(error);
      await SampleController.list(req, res, next);
      expect(listStub).to.be.calledWith();
      expect(res.json).to.not.have.been.called;
      expect(res.status).to.not.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });
  });
});
