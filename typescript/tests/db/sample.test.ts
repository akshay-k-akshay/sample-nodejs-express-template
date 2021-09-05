import sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinonChai from "sinon-chai";
import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";

import { Sample } from "../../src/models/sample";
import { Samples } from "../../src/db";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Sample DB", () => {
  let saveStub: any;
  let findStub: any;
  let countDocumentStub: any;

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
      const result = await Samples.create({ title: "test title" });
      expect(result).to.be.deep.equal({ title: "test title" });
      expect(saveStub).to.be.callCount(1);
    });

    it("error", async () => {
      saveStub.rejects("rejected");
      await expect(Samples.create({ title: "test title" })).to.be.rejected;
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
      const result = await Samples.list(1, 0);
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
      await expect(Samples.list(1, 0)).to.be.rejected;
      expect(findStub).to.be.callCount(1);
    });
  });
});
