'use strict';

module.exports = class HttpError extends Error {
  constructor(code, message) {
    super(message);
    this.name = this.constructor.name;
    this.status = code;
    this.statusCode = code;
  }

  static create(code, errorOrMessage) {
    const defaultMessage = HttpError.getDefualtMessage(code);
    if (!defaultMessage) {
      throw new Error("HttpError has wrong/missing 'code' argument");
    }

    if (errorOrMessage instanceof Error) {
      let msg = errorOrMessage.message;
      if (!msg) msg = defaultMessage;
      const httpError = new HttpError(code, msg);
      httpError.stack = errorOrMessage.stack;

      return httpError;
    }

    let msg = errorOrMessage;
    if (!msg) msg = defaultMessage;
    const httpError = new HttpError(code, msg);

    const stackArray = httpError.stack.split('\n');
    const stackHead = stackArray[0];
    const stackTail = stackArray.slice(2);
    httpError.stack = [stackHead, ...stackTail].join('\n');

    return httpError;
  }

  static getDefualtMessage(code) {
    const defaultMessages = {
      400: 'Bad Request',
      404: 'Not Found',
      500: 'Internal Server Error'
    };
    return defaultMessages[code];
  }
};
