const { StatusCodes } = require("http-status-codes");

module.exports = {
  ping: (req, res) => {
    return res.status(StatusCodes.OK).json({
      message: "pong"
    });
  },

  pong: (req, res) => {
    return res.status(StatusCodes.OK).json({
      message: "ping"
    });
  }
};
