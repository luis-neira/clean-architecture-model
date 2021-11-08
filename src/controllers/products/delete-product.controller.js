'use strict';

const { BaseController } = require('../base.controller');

module.exports = class DeleteProductController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.body;

    const productOrError = await this.useCase.execute(requestDetails);

    if (productOrError.isFailure) {
      const useCaseError = productOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    this.noContent(res);
  }
};
