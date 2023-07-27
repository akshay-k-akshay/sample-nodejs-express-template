const { Schema, model, models } = require("mongoose");

const sampleSchema = new Schema(
  {
    title: { type: String }
  },
  { timestamps: true }
);

const Sample = models.Sample || model("Sample", sampleSchema);

module.exports = { Sample };
