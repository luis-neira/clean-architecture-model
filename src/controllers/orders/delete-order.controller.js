'use strict';

const { BaseController } = require('../base.controller');

module.exports = class DeleteOrderController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.body;

    const orderOrError = await this.useCase.execute(requestDetails);

    if (orderOrError.isFailure) {
      const useCaseError = orderOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    this.noContent(res);
  }
};
