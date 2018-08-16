export default class AppError extends Error {
  constructor(message, status) {
    super(message); // Equals to new Error ('Message')
    this.name = this.constructor.name; // Gives name to error
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
}
