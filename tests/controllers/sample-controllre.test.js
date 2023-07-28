const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinonChai = require("sinon-chai");
const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");
const { mockReq, mockRes } = require("sinon-express-mock");

const controller = require("../../src/controllers/sample-controller");
const sampleService = require("../../src/services/sample-service");

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("sample controller", () => {
  let req;
  let res;
  let createStub;
  let listStub;
  let next;

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
      createStub.resolves({
        createdAt: 16222522555,
        _id: "6130f9632ad0364924c9feac",
        __v: 0
      });
      await controller.create(req, res, next);
      expect(res.status).to.be.calledWith(StatusCodes.OK);
      expect(res.json).to.be.calledWith({
        message: "sample data saved successfully",
        data: {
          createdAt: 16222522555,
          _id: "6130f9632ad0364924c9feac",
          __v: 0
        }
      });
      expect(createStub).to.be.callCount(1);
      expect(createStub).to.be.calledWith({ title: "test title" });
    });
    it("error", async () => {
      const error = new Error("some error");
      createStub.rejects(error);
      await controller.create(req, res, next);
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
            createdAt: 16222522555,
            _id: "6130f9632ad0364924c9feac",
            __v: 0
          }
        ],
        meta: {
          total: 5,
          limit: 10
        }
      });
      await controller.list(req, res, next);
      expect(res.status).to.be.calledWith(StatusCodes.OK);
      expect(listStub).to.be.callCount(1);
      expect(listStub).to.have.been.calledWith();
      expect(res.json).to.be.calledWith({
        message: "fetched sample data successfully",
        data: [
          {
            createdAt: 16222522555,
            _id: "6130f9632ad0364924c9feac",
            __v: 0
          }
        ],
        meta: { total: 5, limit: 10 }
      });
    });

    it("error", async () => {
      const error = new Error("some error");
      listStub.rejects(error);
      await controller.list(req, res, next);
      expect(listStub).to.be.calledWith();
      expect(res.json).to.not.have.been.called;
      expect(res.status).to.not.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });
  });
});
