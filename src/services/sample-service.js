const Sample = require("../db/sample");
const { BadRequestError } = require("../errors");

module.exports = {
  create: async (sampleData) => {
    if (!sampleData.title) {
      throw new BadRequestError("title is empty");
    }
    return await Sample.create(sampleData);
  },

  list: async (limit, page) => {
    const skip = (page - 1) * limit;
    return await Sample.list(limit, skip);
  }
};
