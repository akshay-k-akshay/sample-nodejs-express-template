const { Schema, model } = require("mongoose");

const now = Date.now();

const sampleSchema = new Schema({
  title: { type: String },
  createdAt: { type: String, default: now }
});

const Sample = model("Sample", sampleSchema);

module.exports = { Sample };
