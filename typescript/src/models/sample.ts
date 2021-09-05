import { Schema, model, models } from "mongoose";
import { now } from "../utils";

const sampleSchema = new Schema({
  title: { type: String },
  createdAt: { type: Number, default: now().getTime() }
});

const Sample = models.Sample || model("Sample", sampleSchema);

export { Sample };
