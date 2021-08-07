import { SampleController as controller } from "../controllers";
import { Router } from "express";

const Sample = Router();

Sample.post("/", controller.create);
Sample.get("/", controller.list);

export { Sample };
