const { Sample } = require("../models/sample");

module.exports = {
  create: async (sampleData) => {
    const sample = new Sample({
      title: sampleData.title
    });

    return await sample.save();
  },

  list: async () => {
    return await Sample.find();
  }
};
