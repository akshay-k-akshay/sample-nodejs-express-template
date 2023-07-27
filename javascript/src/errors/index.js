const Errors = {
  NOT_FOUND: "NotFoundError",
  BAD_REQUEST: "BadRequestError",
  UNAUTHORIZED: "UnAuthorizedError",
  FORBIDDEN: "ForbiddenError"
};

class NotFoundError extends Error {
  constructor(message, args) {
    super(message);
    this.name = Errors.NOT_FOUND;
    this.args = args;
  }
}

class BadRequestError extends Error {
  constructor(message, args) {
    super(message);
    this.name = Errors.BAD_REQUEST;
    this.args = args;
  }
}

class UnAuthorizedError extends Error {
  constructor(message, args) {
    super(message);
    this.name = Errors.UNAUTHORIZED;
    this.args = args;
  }
}

class ForbiddenError extends Error {
  constructor(message, args) {
    super(message);
    this.name = Errors.FORBIDDEN;
    this.args = args;
  }
}

module.exports = {
  Errors,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnAuthorizedError
};
