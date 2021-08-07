export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
