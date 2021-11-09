'use strict';

const { BaseController } = require('../controller');
const { SuccessResponse } = require('../../common/contracts');
const { UserMap } = require('../../common/mappers');

module.exports = class GetUserByIdController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.params;

    const userOrError = await this.useCase.execute(requestDetails);

    if (userOrError.isFailure) {
      const useCaseError = userOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    const persistedUser = userOrError.getValue();

    const responseDto = SuccessResponse.create(UserMap.toDTO(persistedUser));

    this.ok(res, responseDto);
  }
};
