import { Schema, model } from "mongoose";

const now = Date.now();

const sampleSchema = new Schema({
  title: { type: String },
  createdAt: { type: String, default: now }
});

const Sample = model("Sample", sampleSchema);

export { Sample };
