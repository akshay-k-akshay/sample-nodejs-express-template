import { PingPongController as controller } from "../controllers";
import { Router } from "express";

const PingPong = Router();

PingPong.get("/ping", controller.ping);
PingPong.get("/pong", controller.pong);

export { PingPong };
