const { StatusCodes } = require("http-status-codes");

const sampleService = require("../services/sample-service");

module.exports = {
  create: async (req, res, next) => {
    try {
      const result = await sampleService.create(req.body);

      return res.status(StatusCodes.OK).json({
        message: "sample data saved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  list: async (req, res, next) => {
    try {
      const result = await sampleService.list();

      return res.status(StatusCodes.OK).json({
        message: "fetched sample data successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
};
