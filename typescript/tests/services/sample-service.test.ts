import sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinonChai from "sinon-chai";
import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";

import { Samples } from "../../src/db";
import { sampleService } from "../../src/services";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Sample Service", () => {
  let createStub: any;
  let listStub: any;

  beforeEach(() => {
    createStub = sinon.stub(Samples, "create");
    listStub = sinon.stub(Samples, "list");
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
      const result = await sampleService.create({ title: "test title" });
      expect(result).to.be.deep.equal(data);
      expect(createStub).to.be.callCount(1);
    });

    it("error", async () => {
      createStub.rejects("rejected");
      await expect(sampleService.create({ title: "test title" })).to.be
        .rejected;
      expect(createStub).to.be.callCount(1);
    });
  });

  describe("List", () => {
    it("success", async () => {
      const data = [
        {
          _id: "611fab87905e3910e7d0a066",
          title: "test title",
          createdAt: new Date("2021-09-02T15:49:06.303Z")
        }
      ];
      listStub.resolves(data);
      const result = await sampleService.list(1, 2);
      expect(result).to.be.deep.equal(data);
      expect(listStub).to.be.callCount(1);
    });

    it("error", async () => {
      listStub.rejects("rejected");
      await expect(sampleService.list(1, 2)).to.be.rejected;
      expect(listStub).to.be.callCount(1);
    });
  });
});
