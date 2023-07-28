const { Sample } = require("../models/sample");

module.exports = {
  create: async (sampleData) => {
    const sample = new Sample({
      title: sampleData.title
    });

    return await sample.save();
  },

  list: async (limit, skip) => {
    const total = await Sample.countDocuments({});
    const samples = await Sample.find({}, "_id title createdAt", {
      skip,
      limit
    });
    return {
      data: samples,
      meta: {
        total,
        limit
      }
    };
  }
};
