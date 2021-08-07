const Sample = require("../db/sample");
module.exports = {
  create: async (sampleData) => {
    return await Sample.create(sampleData);
  },

  list: async () => {
    return await Sample.list();
  }
};
