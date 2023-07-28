const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinonChai = require("sinon-chai");
const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");

const Sample = require("../../src/db/sample");
const SampleService = require("../../src/services/sample-service");

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Sample Service", () => {
  let createStub;
  let listStub;

  beforeEach(() => {
    createStub = sinon.stub(Sample, "create");
    listStub = sinon.stub(Sample, "list");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("create", () => {
    it("success", async () => {
      const data = {
        _id: "611fab87905e3910e7d0a066",
        title: "test title",
        createdAt: new Date("2021-09-02T15:49:06.303Z")
      };
      createStub.resolves(data);
      const result = await SampleService.create({ title: "test title" });
      expect(result).to.be.deep.equal(data);
      expect(createStub).to.be.callCount(1);
    });

    it("error", async () => {
      createStub.rejects("rejected");
      await expect(SampleService.create({ title: "test title" })).to.be
        .rejected;
      expect(createStub).to.be.callCount(1);
    });
  });

  describe("List", () => {
    it("success", async () => {
      const response = {
        data: [
          {
            _id: "611fab87905e3910e7d0a066",
            title: "test title",
            createdAt: new Date("2021-09-02T15:49:06.303Z")
          }
        ],
        meta: {
          total: 10,
          limit: 1
        }
      };
      listStub.resolves(response);
      const result = await SampleService.list(1, 2);
      expect(result).to.be.deep.equal(response);
      expect(listStub).to.be.callCount(1);
    });

    it("error", async () => {
      listStub.rejects("rejected");
      await expect(SampleService.list(1, 2)).to.be.rejected;
      expect(listStub).to.be.callCount(1);
    });
  });
});
