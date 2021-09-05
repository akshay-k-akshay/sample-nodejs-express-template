const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinonChai = require("sinon-chai");
const { describe, it } = require("mocha");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");
const { mockReq, mockRes } = require("sinon-express-mock");

const controller = require("../../src/controllers/ping-pong-controller");

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("ping pong controller", () => {
  const req = mockReq();
  let res;
  it("ping", () => {
    res = mockRes();
    controller.ping(req, res);
    expect(res.status).to.be.calledWith(StatusCodes.OK);
    expect(res.status(StatusCodes.OK).json).to.be.calledWith({
      message: "pong"
    });
  });

  it("pong", () => {
    res = mockRes();
    controller.pong(req, res);
    expect(res.status).to.be.calledWith(StatusCodes.OK);
    expect(res.status(StatusCodes.OK).json).to.be.calledWith({
      message: "ping"
    });
  });
});
