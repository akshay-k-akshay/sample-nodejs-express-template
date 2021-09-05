const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinonChai = require("sinon-chai");
const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");

const { Sample } = require("../../src/models/sample");
const SampleDb = require("../../src/db/sample");

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Sample DB", () => {
  let saveStub;
  let findStub;
  let countDocumentStub;

  beforeEach(() => {
    saveStub = sinon.stub(Sample.prototype, "save");
    findStub = sinon.stub(Sample, "find");
    countDocumentStub = sinon.stub(Sample, "countDocuments");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Save to db", () => {
    it("success", async () => {
      saveStub.resolves({ title: "test title" });
      const result = await SampleDb.create({ title: "test title" });
      expect(result).to.be.deep.equal({ title: "test title" });
      expect(saveStub).to.be.callCount(1);
    });

    it("error", async () => {
      saveStub.rejects("rejected");
      await expect(SampleDb.create({ title: "test title" })).to.be.rejected;
      expect(saveStub).to.be.callCount(1);
    });
  });

  describe("List from db", () => {
    it("success", async () => {
      const data = [
        {
          _id: "611fab87905e3910e7d0a066",
          title: "test title",
          createdAt: new Date("2021-09-02T15:49:06.303Z")
        }
      ];
      countDocumentStub.resolves(1);
      findStub.resolves(data);
      const result = await SampleDb.list(1, 0);
      expect(result).to.be.deep.equal({
        data,
        meta: {
          limit: 1,
          total: 1
        }
      });
      expect(findStub).to.be.callCount(1);
    });

    it("error", async () => {
      countDocumentStub.resolves(1);
      findStub.rejects("rejected");
      await expect(SampleDb.list(1, 0)).to.be.rejected;
      expect(findStub).to.be.callCount(1);
    });
  });
});
