const { Schema, model, models } = require("mongoose");

const { now } = require("../utils");

const sampleSchema = new Schema({
  title: { type: String },
  createdAt: { type: Number, default: now().getTime() }
});

const Sample = models.Sample || model("Sample", sampleSchema);

module.exports = { Sample };
