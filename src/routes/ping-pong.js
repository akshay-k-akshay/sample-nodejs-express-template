const express = require("express");

const controller = require("../controllers/ping-pong-controller");

const PingPong = new express.Router();

PingPong.get("/ping", controller.ping);
PingPong.get("/pong", controller.pong);

module.exports = { PingPong };
