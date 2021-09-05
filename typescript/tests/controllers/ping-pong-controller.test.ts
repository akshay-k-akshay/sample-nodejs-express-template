import chai, { expect } from "chai";
import { describe, it } from "mocha";
import chaiAsPromised from "chai-as-promised";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { mockRes } from "sinon-express-mock";
import sinonChai from "sinon-chai";

import { PingPongController } from "../../src/controllers";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("PingPongController", () => {
  let req: Request;
  let res: Response;

  it("ping", () => {
    res = mockRes();
    PingPongController.ping(req, res);
    expect(res.status).to.be.calledWith(StatusCodes.OK);
    expect(res.status(StatusCodes.OK).json).to.be.calledWith({
      message: "pong"
    });
  });

  it("pong", () => {
    res = mockRes();
    PingPongController.pong(req, res);
    expect(res.status).to.be.calledWith(StatusCodes.OK);
    expect(res.status(StatusCodes.OK).json).to.be.calledWith({
      message: "ping"
    });
  });
});
