const express = require("express");

const controller = require("../controllers/sample-controller");

const Sample = new express.Router();

Sample.post("/", controller.create);
Sample.get("/", controller.list);

module.exports = { Sample };
