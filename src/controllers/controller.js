'use strict';

const { HttpError } = require('../common/errors');
const constants = require('../config/constants');

module.exports.BaseController = class BaseController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async processRequest(req, res, next) {
    throw Error('processRequest not implemented');
  }

  getRequestHandler() {
    const boundRequestProcessor = this.processRequest.bind(this);
    // controller entrypoint:
    return async (req, res, next) => {
      const requestDto = {
        query: req.query,
        params: req.params,
        body: req.body,
        headers: req.headers
      };

      try {
        await boundRequestProcessor(requestDto, res, next);
      } catch (error) {
        this.internalServerError(next, error);
      }
    };
  }

  ok(res, value) {
    if (!value) {
      return res.sendStatus(200);
    }
    return res.status(200).send(value);
  }

  created(res, value) {
    return res.status(201).send(value);
  }

  noContent(res) {
    return res.sendStatus(204);
  }

  makeErrorHandler(code) {
    const errorLookup = {
      [constants.ERR_VALIDATION]: this.badRequest,
      [constants.ERR_VALUE_NOT_FOUND]: this.notFound
    };

    return errorLookup[code] || this.internalServerError;
  }

  badRequest(next, err) {
    let badRequestError = HttpError.create(400, err);
    if (err.validationErrors) {
      badRequestError = withValidationErrors(badRequestError, err);
    }
    return next(badRequestError);
  }

  notFound(next, err) {
    let notFoundError = HttpError.create(404, err);
    if (err.validationErrors) {
      notFoundError = withValidationErrors(notFoundError, err);
    }
    return next(notFoundError);
  }

  internalServerError(next, err) {
    const internalServerError = HttpError.create(500, err);
    return next(internalServerError);
  }
};

function withValidationErrors(customError, srcError) {
  customError.reason = srcError.reason;
  customError.validationErrors = srcError.validationErrors;
  return customError;
}
