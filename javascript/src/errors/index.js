class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError
};
