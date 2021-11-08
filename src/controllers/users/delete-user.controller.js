'use strict';

const { BaseController } = require('../base.controller');

module.exports = class DeleteUserController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.body;

    const userOrError = await this.useCase.execute({
      user: { ...requestDetails }
    });

    if (userOrError.isFailure) {
      const useCaseError = userOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    this.noContent(res);
  }
};
